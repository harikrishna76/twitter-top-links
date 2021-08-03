import { TwitterClient } from 'twitter-api-client';
import BaseController from '../utils/BaseController';
import TweetsService from './service';
import LocationsService from '../locations/service';
import DomainStatsService from '../domainStats/service';
import UserStatsService from '../userStats/service';
import TasksService from '../tasks/service';
import config from '../../config';

class Controller extends BaseController {
  constructor() {
    super(TweetsService);
    this.allowedQueryParams = ['text', '_id', 'skip', 'limit', 'hashtags'];
    const currentDate = new Date();
    this.sevenDaysBefore = new Date(
      currentDate.getTime() - 7 * 24 * 60 * 60 * 1000,
    );
    this.includeTotalCountInGetAll = true;
  }

  setClient = ({ accessToken, accessTokenSecret }) => {
    if (!this.twitterClient) {
      this.twitterClient = new TwitterClient({
        apiKey: config.auth.twitter.key,
        apiSecret: config.auth.twitter.secret,
        accessToken,
        accessTokenSecret,
      });
    }
  };

  generateTweets = async (user, autoGenerate = true) => {
    this.setClient({
      accessToken: user.token,
      accessTokenSecret: user.tokenSecret,
    });
    try {
      this.tweetGenerator = await TasksService.findTaskByUser(user);
      console.log('this.twee', this.tweetGenerator, user);
      if (autoGenerate && this.tweetGenerator && this.tweetGenerator.finished) {
        return { message: 'Already Generated', success: false };
      }
      if (!this.tweetGenerator) {
        this.tweetGenerator = await TasksService.createTweetGeneratorTask(user);
      } else {
        await TasksService.updateById(this.tweetGenerator._id, {
          status: 'STARTED',
          finished: false,
        });
      }
      console.log('this.twee', this.tweetGenerator);
      // can be used for manual generation
      // else if (this.tweetGenerator && this.tweetGenerator.finished) {
      //   await TasksService.updateById(this.tweetGenerator._id, {
      //     status: 'STARTED',
      //     finished: false,
      //   });
      // } else if (this.tweetGenerator) {
      //   delete this.tweetGenerator.userId;
      //   return {
      //     message: 'Generation is in progress',
      //     success: true,
      //     task: this.tweetGenerator,
      //   };
      // }
      const allTweets = await this.fetchLastSevenDaysTweets();
      this.userId = user._id;
      await this.processTweets(allTweets, user._id);
      await TasksService.updateById(this.tweetGenerator._id, {
        status: 'COMPLETED',
        finished: true,
      });
      return { success: true };
    } catch (error) {
      console.log('error', error);
      await TasksService.updateById(this.tweetGenerator._id, {
        status: 'FAILED',
        finished: false,
      });
      return { success: false };
    }
  };

  fetchLastSevenDaysTweets = (prevTweets = [], maxId) =>
    new Promise(async resolve => {
      const parameters = { count: 50 };
      if (maxId) {
        parameters.max_id = maxId;
      }
      this.twitterClient.tweets
        .statusesHomeTimeline(parameters)
        .then(response => {
          let data = response;
          if (!data) data = [];
          const allTweets = [...prevTweets, ...data];
          const lastTweet = allTweets[allTweets.length - 1];
          const lastTweetTime = new Date(lastTweet.created_at);
          if (lastTweetTime.getTime() > this.sevenDaysBefore.getTime()) {
            allTweets.splice(-1, 1);
            resolve(this.fetchLastSevenDaysTweets(allTweets, lastTweet.id));
          } else {
            resolve(allTweets);
          }
        })
        .catch(error => {
          console.log('error', error);
          resolve(prevTweets);
        });
    });

  processTweets = async allTweets => {
    console.log('allTweets', allTweets.length);
    await TasksService.updateById(this.tweetGenerator._id, {
      status: 'PROCESSING_TWEETS',
    });
    const userStats = {};
    const locations = {};
    const domainStats = {};
    const tweetsToSave = [];
    allTweets.forEach(tweet => {
      const { user } = tweet;
      if (tweet.entities && tweet.entities.urls && tweet.entities.urls.length) {
        const { urls } = tweet.entities;
        this.processUserStats(userStats, user, urls.length);
        const { location } = user;
        if (!locations[location]) {
          locations[location] = { name: location, userId: this.userId };
        }
        this.processDomainStats(domainStats, urls);
        tweetsToSave.push({ ...tweet, userId: this.userId });
      }
    });
    await this.storeTweetsData(tweetsToSave, userStats, locations, domainStats);
  };

  processUserStats = (statsByUser, user, urlsCount) => {
    if (statsByUser[user.id]) {
      // eslint-disable-next-line no-param-reassign
      statsByUser[user.id].tweets += 1;
      // eslint-disable-next-line no-param-reassign
      statsByUser[user.id].urlsCount += urlsCount;
    } else {
      // eslint-disable-next-line no-param-reassign
      statsByUser[user.id] = {
        id: user.id,
        name: user.name,
        screen_name: user.screen_name,
        tweets: 1,
        userId: this.userId,
        urlsCount: 1,
        profile_image_url_https: user.profile_image_url_https,
      };
    }
  };

  processDomainStats = (domainStats, urls) => {
    urls.forEach(url => {
      const domain = url.expanded_url.replace(/.+\/\/|www.|\..+/g, '');
      if (domainStats[domain]) {
        // eslint-disable-next-line no-param-reassign
        domainStats[domain].shared += 1;
      } else {
        const urlArray = url.expanded_url.split('/') || [];
        const protocol = urlArray[0];
        const host = urlArray[2];
        const origin = `${protocol}//${host}`;
        // eslint-disable-next-line no-param-reassign
        domainStats[domain] = {
          name: domain,
          shared: 1,
          userId: this.userId,
          origin,
        };
      }
    });
  };

  storeTweetsData = async (tweets, userStats, locations, domainStats) => {
    console.log('tweetsToSave', tweets.length);
    if (!tweets.length) {
      return;
    }
    await TasksService.updateById(this.tweetGenerator._id, {
      status: 'STORING_TWEETS',
    });
    await this.deleteIfAnyDataExits();
    const options = { ordered: false };
    await TweetsService.model.insertMany(tweets, options, this.errorLog);
    await UserStatsService.model.insertMany(
      Object.values(userStats),
      options,
      this.errorLog,
    );
    await LocationsService.model.insertMany(
      Object.values(locations),
      options,
      this.errorLog,
    );
    await DomainStatsService.model.insertMany(
      Object.values(domainStats),
      options,
      this.errorLog,
    );
  };

  deleteIfAnyDataExits = async () => {
    await TweetsService.model.deleteMany({ userId: this.userId });
    await UserStatsService.model.deleteMany({ userId: this.userId });
    await LocationsService.model.deleteMany({ userId: this.userId });
    await DomainStatsService.model.deleteMany({ userId: this.userId });
  };
}

export default new Controller();

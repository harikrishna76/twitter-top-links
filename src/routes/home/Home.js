import useStyles from 'isomorphic-style-loader/useStyles';
import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
import { fetchTweets } from '../../actions/tweets';
import { fetchTweetGeneratorTask } from '../../actions/tasks';
import SearchHeader from '../../components/SearchHeader';
import TweetsGenerationProgress from '../../components/TweetsGenerationProgress';
import Tweet from '../../components/Tweet';
import Loader from '../../components/Loader';
// import PropTypes from 'prop-types';
import s from './Home.css';

const defaultPagination = {
  skip: 0,
  limit: 20,
  totalFetched: 0,
  totalCount: 20,
};

export default function Home() {
  useStyles(s);

  const [tweetsGenerated, setTweetsGenerated] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [fetchingNewTweets, setFetchingNewTweets] = useState(null);
  const [tweetsPagination, setTweetsPagination] = useState({
    ...defaultPagination,
  });
  const [task, setTask] = useState({});
  const [fetchMore, setFetchMore] = useState(0);
  const [filters, setFilters] = useState({});

  const populateGenerationProgress = async (retryCount = 0) => {
    const response = await fetchTweetGeneratorTask();
    if (retryCount < 10 && response && !response.finished) {
      setTimeout(() => populateGenerationProgress(retryCount + 1), 1000);
    }
    if (response && response.finished) {
      localStorage.setItem('tweetsGenerated', true);
      setTweetsGenerated(true);
    }
    setTask(response || {});
  };

  const populateTweets = async () => {
    if (tweetsGenerated) {
      if (
        !fetchingNewTweets &&
        tweetsPagination.totalFetched < tweetsPagination.totalCount
      ) {
        setFetchingNewTweets(true);
        const queryFields = {
          skip: tweetsPagination.skip,
          limit: tweetsPagination.limit,
        };
        if (filters.locations && Object.keys(filters.locations).length) {
          queryFields['user.location'] = Object.keys(filters.locations);
        }
        if (filters.hashtag) {
          queryFields['entities.hashtags.text'] = filters.hashtag;
        }
        let response = await fetchTweets(queryFields);
        response = response || {};
        const newRows = response.rows && response.rows.length;
        if (newRows) {
          const newPagination = {
            skip: tweetsPagination.skip + newRows,
            limit: tweetsPagination.limit,
            totalCount: response.totalCount,
            totalFetched: (tweets || []).length + newRows,
          };
          setTweets([...(tweets || []), ...(response.rows || [])]);
          setTweetsPagination(newPagination);
        } else {
          setTweets([...(tweets || [])]);
          const newPagination = {
            ...tweetsPagination,
            totalCount: response.totalCount,
            totalFetched: (tweets || []).length,
          };
          setTweetsPagination(newPagination);
        }
        setFetchingNewTweets(false);
      }
    }
  };

  const isBottom = el => {
    return el && el.getBoundingClientRect().bottom <= window.innerHeight;
  };

  const trackScrolling = (nFetchMore = 0) => {
    const wrappedElement = document.getElementById('tweetsContainer');
    if (isBottom(wrappedElement)) {
      setFetchMore(nFetchMore);
      if (tweetsPagination.totalFetched >= tweetsPagination.totalCount) {
        document.removeEventListener('scroll', () =>
          trackScrolling(nFetchMore + 1),
        );
      }
    }
  };

  const handleFiltersChange = useCallback(newFilters => {
    setTweetsPagination(prev => ({ ...prev, ...defaultPagination }));
    setFilters(prev => ({ ...prev, ...newFilters }));
    setTweets(null);
    setFetchMore(prev => (prev > 0 ? 0 : 1));
  }, []);

  useEffect(() => {
    const generated = Boolean(localStorage.getItem('tweetsGenerated'));
    setTweetsGenerated(generated);
    if (!generated) {
      populateGenerationProgress();
    }
    document.addEventListener('scroll', trackScrolling);
    return () => {
      document.removeEventListener('scroll', trackScrolling);
    };
  }, []);

  useEffect(() => {
    populateTweets();
  }, [tweetsGenerated, fetchMore]);

  const renderTweets = () => {
    if (tweets && tweets.length === 0) {
      return <div className={s.loaderContainer}>Tweets not available</div>;
    }
    return (
      <div id="tweetsContainer">
        {tweets && tweets.map(tweet => <Tweet tweet={tweet} key={tweet._id} />)}
        {fetchingNewTweets && (
          <div className={s.loaderContainer}>
            <Loader message="fetching tweets" />
          </div>
        )}
        {tweetsPagination.totalFetched === tweetsPagination.totalCount && (
          <div className={s.loaderContainer}>
            Sorry :( no more tweets to show
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    return tweetsGenerated ? (
      renderTweets()
    ) : (
      <TweetsGenerationProgress task={task} />
    );
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <SearchHeader onFiltersChange={handleFiltersChange} />
        {tweetsGenerated === null ? (
          <div className={s.loaderContainer}>
            <Loader message="Fetching data" />
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
}

Home.propTypes = {};

import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import PropTypes from 'prop-types';
// import OpenGraph from 'opengraph-react';
import ProfileStrip from '../ProfileStrip/ProfileStrip';
import s from './Tweet.css';

function Tweet({ tweet }) {
  useStyles(s);

  const urls = (tweet && tweet.entities && tweet.entities.urls) || [];

  const hashtags = (tweet && tweet.entities && tweet.entities.hashtags) || [];

  const firstUrl = urls && urls[0] && urls[0].url;

  return tweet._id ? (
    <div className={s.root} key={tweet._id}>
      <ProfileStrip profileDetails={tweet.user} />
      <div className={s.body}>
        <div>{tweet.text.replace(firstUrl, '')}</div>
        <div className={s.urls}>
          {urls.map(url => (
            <div key={url.url}>
              <a
                href={url.expanded_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {url.url}
              </a>
            </div>
          ))}
        </div>
        <div className={s.hashtags}>
          {hashtags.map(hashtag => (
            <a
              href={`https://twitter.com/hashtag/${hashtag.text}`}
              target="_blank"
              rel="noopener noreferrer"
              key={hashtag._id}
            >
              #{hashtag.text}
            </a>
          ))}
        </div>
        <div className={s.location}>
          Location: {tweet.user.location}, Date:{' '}
          {new Date(tweet.created_at).toString().substr(0, 15)}
        </div>
      </div>
    </div>
  ) : null;
}

export default React.memo(Tweet);

Tweet.propTypes = {
  tweet: PropTypes.object,
};

Tweet.defaultProps = {
  tweet: {},
};

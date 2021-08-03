import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import PropTypes from 'prop-types';
import s from './ProfileStrip.css';

export default function ProfileStrip({ profileDetails: details, bannerStyle }) {
  useStyles(s);

  const profileDetails = { ...details };

  if (details.name) {
    profileDetails.displayName = details.name;
    profileDetails.username = details.screen_name;
  }

  return profileDetails.displayName ? (
    <a
      className={`${s.profileStrip} ${bannerStyle && s.bannerStyle}`}
      href={`https://twitter.com/${profileDetails.username}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <img
        src={
          profileDetails.profile_image_url_https ||
          'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
        }
        alt=""
      />
      <div className={s.details}>
        <div className={s.displayName}>{profileDetails.displayName}</div>
        <div className={s.userName}>@{profileDetails.username}</div>
        {profileDetails.tweets && (
          <div className={s.userName}>
            Tweets: {profileDetails.tweets}, Links: {profileDetails.urlsCount}
          </div>
        )}
      </div>
    </a>
  ) : null;
}

ProfileStrip.propTypes = {
  profileDetails: PropTypes.object.isRequired,
  bannerStyle: PropTypes.bool,
};

ProfileStrip.defaultProps = {
  bannerStyle: false,
};

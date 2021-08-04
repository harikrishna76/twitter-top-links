import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import PropTypes from 'prop-types';
import Loader from '../Loader';
// import Loader from './Loader.gif';
import s from './TweetsGenerationProgress.css';

const messages = {
  STARTED: 'Started cloning the tweets',
  PROCESSING_TWEETS: 'Processing tweets',
  STORING_TWEETS: 'Storing tweets',
  COMPLETED: 'Getting Tweets',
};

export default function TweetsGenerationProgress({ task = {} }) {
  useStyles(s);

  return (
    <div className={s.root}>
      <Loader message={messages[task.status]} />
    </div>
  );
}

TweetsGenerationProgress.propTypes = {
  task: PropTypes.object.isRequired,
};

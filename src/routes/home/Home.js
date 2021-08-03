import useStyles from 'isomorphic-style-loader/useStyles';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { getTweets } from '../../actions/tweets';
import { fetchTweetGeneratorTask } from '../../actions/tasks';
import SearchHeader from '../../components/SearchHeader';
import TweetsGenerationProgress from '../../components/TweetsGenerationProgress';
// import PropTypes from 'prop-types';
import s from './Home.css';

export default function Home() {
  useStyles(s);
  const [tweetsGenerated, setTweetsGenerated] = useState(null);
  // const [tweets, setTweets] = useState(null);
  const [task, setTask] = useState({});

  const populateGenerationProgress = async (retryCount = 0) => {
    const response = await fetchTweetGeneratorTask();
    if (retryCount < 10 && !response.finished) {
      setTimeout(() => populateGenerationProgress(retryCount + 1), 1000);
    }
    setTask(response || {});
  };

  const populateTweets = async () => {
    if (task.finished) {
      const response = await getTweets({ limit: 20 });
      console.log('response', response);
    }
  };

  useEffect(() => {
    const generated = Boolean(localStorage.getItem('tweetsGenerated'));
    setTweetsGenerated(generated);
    if (!generated) {
      populateGenerationProgress();
    }
  }, []);

  useEffect(() => {
    populateTweets();
  }, [task]);

  const renderContent = () => {
    return tweetsGenerated ? (
      <div>Tweets will show up here</div>
    ) : (
      <TweetsGenerationProgress task={task} />
    );
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <SearchHeader />
        {tweetsGenerated === null ? <div>Loading...</div> : renderContent()}
      </div>
    </div>
  );
}

Home.propTypes = {};

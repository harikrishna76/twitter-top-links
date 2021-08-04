import useStyles from 'isomorphic-style-loader/useStyles';
import React, { useState, useEffect } from 'react';
import { fetchTweetGeneratorTask } from '../../actions/tasks';
import s from './MetricsPanel.css';
import UserStatsWidget from '../UserStatsWidget';
import DomainStatsWidget from '../DomainStatsWidget';

export default function MetricsPanel() {
  useStyles(s);

  const [tweetsGenerated, setTweetsGenerated] = useState(null);

  const populateGenerationProgress = async (retryCount = 0) => {
    const response = await fetchTweetGeneratorTask();
    if (retryCount < 10 && response && !response.finished) {
      setTimeout(() => populateGenerationProgress(retryCount + 1), 1000);
    }
    if (response && response.finished) {
      localStorage.setItem('tweetsGenerated', true);
      setTweetsGenerated(true);
    }
  };

  useEffect(() => {
    const generated = Boolean(localStorage.getItem('tweetsGenerated'));
    setTweetsGenerated(generated);
    if (!generated) {
      populateGenerationProgress();
    }
  }, []);

  return (
    <div className={s.root}>
      {tweetsGenerated && (
        <>
          <UserStatsWidget />
          <DomainStatsWidget />
        </>
      )}
    </div>
  );
}

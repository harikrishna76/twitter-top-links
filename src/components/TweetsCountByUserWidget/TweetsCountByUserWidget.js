import React, { useState, useEffect } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './TweetsCountByUserWidget.css';
import { fetchUserStats } from '../../actions/stats';
import MetricWidgetLayout from '../MetricWidgetLayout/MetricWidgetLayout';
import ProfileStrip from '../ProfileStrip';

export default function TweetsCountByUserWidget() {
  useStyles(s);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState(null);

  const populateUserStats = async () => {
    const response = await fetchUserStats();
    console.log('populateUserStats', response);
    setUserStats(response);
    setLoading(false);
  };

  useEffect(() => {
    populateUserStats();
  }, []);

  return (
    <MetricWidgetLayout
      title="Trending profiles"
      greyVersion
      loading={loading}
      stripsCount={(userStats && userStats.length) || 0}
      stripHeight={60}
      maxItemsOnCollapse={3}
    >
      <div className={s.content}>
        {!loading &&
          userStats &&
          userStats.map(user => (
            <div className={s.stripItem} key={user._id}>
              <ProfileStrip profileDetails={user} />
            </div>
          ))}
      </div>
    </MetricWidgetLayout>
  );
}

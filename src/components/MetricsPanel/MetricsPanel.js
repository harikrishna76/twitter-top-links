import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import s from './MetricsPanel.css';
import UserStatsWidget from '../UserStatsWidget';
import DomainStatsWidget from '../DomainStatsWidget';

export default function MetricsPanel() {
  useStyles(s);

  return (
    <div className={s.root}>
      <UserStatsWidget />
      <DomainStatsWidget />
    </div>
  );
}

import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './FilterByLocation.css';
import MetricWidgetLayout from '../MetricWidgetLayout';

export default function SearchHeader() {
  useStyles(s);

  return (
    <MetricWidgetLayout loading title="Filter by locations">
      <div className={s.root}>locations comes here</div>
    </MetricWidgetLayout>
  );
}

import React, { useState, useEffect } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './DomainStatsWidget.css';
import { fetchDomainStats } from '../../actions/stats';
import MetricWidgetLayout from '../MetricWidgetLayout/MetricWidgetLayout';

export default function DomainStatsWidget() {
  useStyles(s);
  const [loading, setLoading] = useState(true);
  const [domainStats, setDomainStats] = useState(null);

  const populateDomainStats = async () => {
    const response = await fetchDomainStats();
    setDomainStats(response);
    setLoading(false);
  };

  useEffect(() => {
    populateDomainStats();
  }, []);

  return (
    <MetricWidgetLayout
      title="Trending Domains"
      greyVersion
      loading={loading}
      stripsCount={(domainStats && domainStats.length) || 0}
      stripHeight={50}
      maxItemsOnCollapse={4}
    >
      {!loading && domainStats && (
        <div className={s.content}>
          {domainStats.map(domain => (
            <div className={s.stripItem} key={domain._id}>
              <a href={domain.origin} target="_blank" rel="noopener noreferrer">
                {domain.name}
              </a>
              <div>Shared: {domain.shared}</div>
            </div>
          ))}
        </div>
      )}
    </MetricWidgetLayout>
  );
}

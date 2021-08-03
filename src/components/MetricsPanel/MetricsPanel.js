import useStyles from 'isomorphic-style-loader/useStyles';
import React, { useEffect } from 'react';
import s from './MetricsPanel.css';
import FilterByLocation from '../FilterByLocation';
import TweetsCountByUserWidget from '../TweetsCountByUserWidget';
import DomainStatsWidget from '../DomainStatsWidget';

export default function MetricsPanel() {
  useStyles(s);

  // const [userDetails, setUserDetails] = useState({});

  // console.log('userDetails', userDetails);

  useEffect(() => {
    // fetchUserDetails();
  }, []);

  return (
    <div className={s.root}>
      <FilterByLocation />
      <TweetsCountByUserWidget />
      <DomainStatsWidget />
    </div>
  );
}

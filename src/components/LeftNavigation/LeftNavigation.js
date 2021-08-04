import useStyles from 'isomorphic-style-loader/useStyles';
import React, { useEffect, useState } from 'react';
import s from './LeftNavigation.css';
import Link from '../Link/Link';
import { getContext } from '../ApplicationContext';
import { getUserDetails } from '../../actions/users';
import ProfileStrip from '../ProfileStrip';
import BrandIcon from '../BrandIcon';

export default function LeftNavigation() {
  useStyles(s);

  const [profileDetails, setProfileDetails] = useState({});

  const appName = getContext('appName');

  const populateProfileDetails = async () => {
    const user = await getUserDetails();
    setProfileDetails(user);
  };

  useEffect(() => {
    populateProfileDetails();
  }, []);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <Link className={s.brand} to="/">
          <BrandIcon />
          <span className={s.brandTxt}>{appName}</span>
        </Link>
        <ProfileStrip profileDetails={profileDetails} bannerStyle />
      </div>
    </div>
  );
}

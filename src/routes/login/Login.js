import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import BrandIcon from 'components/BrandIcon';
import { getContext } from 'components/ApplicationContext';
import s from './Login.css';

export default function Login() {
  useStyles(s);

  const appName = getContext('appName');

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{appName}</h1>
        <div className={s.formGroup}>
          <a className={s.twitter} href="/login/twitter">
            <BrandIcon className={s.icon} />
            <span>Log in with Twitter</span>
          </a>
        </div>
      </div>
    </div>
  );
}

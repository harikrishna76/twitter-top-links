import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import s from './Footer.css';
import Link from '../Link';

export default function Footer() {
  useStyles(s);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <span className={s.text}>© Your Company</span>
        <span className={s.spacer}>·</span>
        <Link className={s.link} to="/">
          Home
        </Link>
      </div>
    </div>
  );
}

import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './SearchHeader.css';

export default function SearchHeader() {
  useStyles(s);

  return (
    <div className={s.root}>
      <input placeholder="Search tweets by hashtag" />
    </div>
  );
}

import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
// import PropTypes from 'prop-types';
import s from './Home.css';

export default function Home() {
  useStyles(s);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>React.js App</h1>
      </div>
    </div>
  );
}

Home.propTypes = {};

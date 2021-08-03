import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import PropTypes from 'prop-types';
import s from './Loader.css';
import image from './Loader.gif';

export default function Loader({ message, ...props }) {
  useStyles(s);

  return (
    <div className={s.root}>
      <img src={image} alt="" {...props} />
      <div>{message}...</div>
    </div>
  );
}

Loader.propTypes = {
  message: PropTypes.string,
};

Loader.defaultProps = {
  message: 'Loading',
};

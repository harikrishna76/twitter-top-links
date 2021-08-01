import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Login.css';

export default function Login({ title }) {
  useStyles(s);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p className={s.lead}>
          Log in with your username or company email address.
        </p>
        <div className={s.formGroup}>
          <a className={s.twitter} href="/login/twitter">
            <svg
              className={s.icon}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={
                  'M30 6.708c-1.105.49-2.756 1.143-4 1.292 1.273-.762 2.54-2.56 ' +
                  '3-4-.97.577-2.087 1.355-3.227 1.773L25 5c-1.12-1.197-2.23-2-4-2-3.398 0-6 ' +
                  '2.602-6 6 0 .4.047.7.11.956L15 10C9 10 5.034 8.724 2 5c-.53.908-1 1.872-1 ' +
                  '3 0 2.136 1.348 3.894 3 5-1.01-.033-2.17-.542-3-1 0 2.98 4.186 6.432 7 7-1 ' +
                  '1-4.623.074-5 0 .784 2.447 3.31 3.95 6 4-2.105 1.648-4.647 2.51-7.53 2.51-.5 ' +
                  '0-.988-.03-1.47-.084C2.723 27.17 6.523 28 10 28c11.322 0 17-8.867 17-17 ' +
                  '0-.268.008-.736 0-1 1.2-.868 2.172-2.058 3-3.292z'
                }
              />
            </svg>
            <span>Log in with Twitter</span>
          </a>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  title: PropTypes.string.isRequired,
};

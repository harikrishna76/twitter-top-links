import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../components/Layout';

const Authenticate = ({ params: { token } = {} }) => {
  useEffect(() => {
    if (token) {
      localStorage.setItem('authorization', token);
      window.location.href = '/';
    }
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader />
    </div>
  );
};

Authenticate.propTypes = {
  params: PropTypes.object.isRequired,
};

const title = 'Log In';

function action(props) {
  return {
    chunks: ['login'],
    title,
    component: <Authenticate params={props.params} />,
  };
}

export default action;

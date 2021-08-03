import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import history from '../../helpers/history';

// import Authenticate from './Login';

const Authenticate = ({ params: { token } = {} }) => {
  console.log('params', token);

  useEffect(() => {
    if (token) {
      localStorage.setItem('authorization', token);
      history.push('/');
    }
  }, []);

  return <div />;
};

Authenticate.propTypes = {
  params: PropTypes.object.isRequired,
};

const title = 'Log In';

function action(props) {
  return {
    chunks: ['login'],
    title,
    component: (
      <Layout>
        <Authenticate params={props.params} />
      </Layout>
    ),
  };
}

export default action;

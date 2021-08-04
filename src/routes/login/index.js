import React from 'react';
import Layout from '../../components/Layout';
import Login from './Login';

const title = 'Log In';

function action(props) {
  return {
    chunks: ['login'],
    title,
    component: (
      <Layout showHeader={false} showFooter={false}>
        <Login title={title} params={props.params} />
      </Layout>
    ),
  };
}

export default action;

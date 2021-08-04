import React, { useContext } from 'react';

const ApplicationContext = React.createContext({
  fetch: () => {
    throw new Error('Fetch method not initialized.');
  },
});

export function getContext(key, defualtValue = {}) {
  const appContext = useContext(ApplicationContext) || {};
  const context = { ...appContext.context };
  if (key) {
    return context[key] || defualtValue;
  }
  return context;
}

export default ApplicationContext;

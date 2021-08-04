/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
  path: '',
  defaultPath: {
    path: '/login',
    load: () => import(/* webpackChunkName: 'home' */ './home'),
  },

  // Keep in mind, routes are evaluated in order
  children: [
    {
      authenticate: true,
      path: '',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      authenticate: false,
      path: '/login',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    {
      authenticate: false,
      path: '/authenticate/:token',
      load: () => import(/* webpackChunkName: 'login' */ './authenticate'),
    },
    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next, appName }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - ${appName}`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;

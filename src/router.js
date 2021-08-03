import UniversalRouter from 'universal-router';
import authenticate from './helpers/authenticate';
import routes from './routes';

export default new UniversalRouter(routes, {
  resolveRoute(context, params) {
    if (typeof context.route.load === 'function') {
      let { route } = context;
      if (!authenticate({ route })) {
        window.location.href = routes.defaultPath.path;
        route = routes.defaultPath;
      }
      return route.load().then(action => action.default(context, params));
    }
    if (typeof context.route.action === 'function') {
      return context.route.action(context, params);
    }
    return undefined;
  },
});

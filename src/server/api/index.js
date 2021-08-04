import passport from '../passport';
import tweets from './tweets';
import users from './users';
import tasks from './tasks';
import userStats from './userStats';
import domainStats from './domainStats';
import locations from './locations';

export default function api(app) {
  app.use(
    '/api/tweets',
    passport.authenticate('jwt', { session: false }),
    tweets,
  );
  app.use(
    '/api/users',
    passport.authenticate('jwt', { session: false }),
    users,
  );
  app.use(
    '/api/tasks',
    passport.authenticate('jwt', { session: false }),
    tasks,
  );
  app.use(
    '/api/userStats',
    passport.authenticate('jwt', { session: false }),
    userStats,
  );
  app.use(
    '/api/domainStats',
    passport.authenticate('jwt', { session: false }),
    domainStats,
  );
  app.use(
    '/api/locations',
    passport.authenticate('jwt', { session: false }),
    locations,
  );
}

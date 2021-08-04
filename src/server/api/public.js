import users from './users/public';

export default function publicApi(app) {
  app.use('/', users);
}

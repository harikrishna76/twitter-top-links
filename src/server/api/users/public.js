// import { app } from 'api/utils/Router';
import { expressRouter } from '../utils/Router';

import Controller from './controller';
import passport from '../../passport';

// app.post('/users/authenticate', Controller.authenticate);

// app.post('/users/', Controller.create);

expressRouter.get('/login/twitter', passport.authenticate('twitter'));

expressRouter.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    assignProperty: 'user',
    failureRedirect: '/',
  }),
  Controller.authenticate,
);

export default expressRouter;

import Router, { expressRouter } from '../utils/Router';
import Controller from './controller';

export default Router(Controller, router => {
  router.get('/me', Controller.getUserDetails);
});

export const publicUsers = expressRouter;

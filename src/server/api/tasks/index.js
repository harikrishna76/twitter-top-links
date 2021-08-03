import Router from '../utils/Router';
import Controller from './controller';

export default Router(Controller, router => {
  router.get('/tweetGenerator', Controller.tweetGeneratorForUser);
});

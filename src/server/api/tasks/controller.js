import BaseController from '../utils/BaseController';
import Service from './service';

class Controller extends BaseController {
  constructor() {
    super(Service);
    this.allowedQueryParams = ['_id', 'userId'];
  }

  tweetGeneratorForUser = async (req, res) => {
    try {
      const doc = await Service.findTaskByUser(req.user);
      res.status(200).send(doc);
    } catch (e) {
      console.error('BaseController getById', e);
      this.sendErrors(res, e);
    }
  };
}

export default new Controller();

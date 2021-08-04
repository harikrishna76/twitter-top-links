import BaseController from '../utils/BaseController';
import Service from './service';

class Controller extends BaseController {
  constructor() {
    super(Service);
    this.allowedQueryParams = [];
  }
}

export default new Controller();

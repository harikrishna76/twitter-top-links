import BaseService from '../utils/BaseService';
import { singletonInitializer } from '../utils/helpers';
import Modal from './model';

const usersService = null;

class Service extends BaseService {
  constructor() {
    super(Modal);
    this.sharableFields = [
      'displayName',
      'username',
      'profile_image_url_https',
      '_id',
    ];
  }
}

export default singletonInitializer(usersService, Service);

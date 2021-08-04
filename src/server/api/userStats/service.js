import BaseService from '../utils/BaseService';
import { singletonInitializer } from '../utils/helpers';
import Modal from './model';

const userStatsService = null;

class Service extends BaseService {
  constructor() {
    super(Modal);
    this.sharableFields = [
      'name',
      'screen_name',
      'tweets',
      'urlsCount',
      'profile_image_url_https',
      '_id',
    ];
    this.defaultSort = { urlsCount: -1 };
  }
}

export default singletonInitializer(userStatsService, Service);

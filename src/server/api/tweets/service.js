import BaseService from '../utils/BaseService';
import { singletonInitializer } from '../utils/helpers';
import Modal from './model';

const tweetsService = null;

class Service extends BaseService {
  constructor() {
    super(Modal);
    this.sharableFields = [
      'created_at',
      'text',
      'retweet_count',
      'favorite_count',
      'favorited',
      'retweeted',
      'reply_count',
      'entities',
      'user',
      '_id',
    ];
  }
}

export default singletonInitializer(tweetsService, Service);

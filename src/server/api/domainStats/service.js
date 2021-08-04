import BaseService from '../utils/BaseService';
import { singletonInitializer } from '../utils/helpers';
import Modal from './model';

const DomainStatsService = null;

class Service extends BaseService {
  constructor() {
    super(Modal);
    this.sharableFields = ['name', 'origin', 'shared', '_id'];
    this.defaultSort = { shared: -1 };
  }
}

export default singletonInitializer(DomainStatsService, Service);

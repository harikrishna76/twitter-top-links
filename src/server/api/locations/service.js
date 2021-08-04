import BaseService from '../utils/BaseService';
import { singletonInitializer } from '../utils/helpers';
import Modal from './model';

const locationsService = null;

class Service extends BaseService {
  constructor() {
    super(Modal);
    this.sharableFields = ['name', '_id'];
  }
}

export default singletonInitializer(locationsService, Service);

import BaseService from '../utils/BaseService';
import { singletonInitializer } from '../utils/helpers';
import Model from './model';

const TasksService = null;

class Service extends BaseService {
  constructor() {
    super(Model);
    this.sharableFields = ['type', 'status', 'finished', '_id'];
    this.updatableFields = ['status', 'finished'];
  }

  createTweetGeneratorTask = user => {
    return this.createDoc({
      type: 'TWEET_GENERATOR',
      status: 'STARTED',
      userId: user._id,
    });
  };

  findTaskByUser = user => {
    return Model.findOne({ userId: user._id }).select(
      this.sharableFields.join(' '),
    );
  };
}

export default singletonInitializer(TasksService, Service);

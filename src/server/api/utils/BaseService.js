export default class BaseService {
  constructor(model) {
    this.model = model;
    this.sharableFields = [];
    this.updatableFields = [];
  }

  createDoc = doc => {
    return this.model
      .create(doc)
      .then(result => result)
      .catch(error => error);
  };

  getAll = (queryFields = {}) => {
    const options = {};
    if (queryFields.skip !== undefined) {
      options.skip = Number(queryFields.skip);
      // eslint-disable-next-line no-param-reassign
      delete queryFields.skip;
    }
    if (queryFields.limit !== undefined) {
      options.limit = Number(queryFields.limit);
      // eslint-disable-next-line no-param-reassign
      delete queryFields.limit;
    }
    if (this.defaultSort) {
      options.sort = this.defaultSort;
    }
    console.log('queryFields', queryFields);
    return this.model
      .find(queryFields, null, options)
      .select(this.sharableFields.join(' '))
      .then(result => {
        return result;
      });
  };

  getById = _id => {
    return this.model.find({ _id }).then(result => {
      return result[0];
    });
  };

  updateById = (_id, values = {}) => {
    const newValues = this.filterUpdatableValues(values);
    return this.model.updateOne({ _id }, { $set: newValues });
  };

  updateByMatch = (params, values = {}) => {
    const newValues = this.filterUpdatableValues(values);
    return this.model.updateOne(params, { $set: newValues });
  };

  filterUpdatableValues = values => {
    const newValues = values || {};
    if (this.updatableFields === 'all') {
      return newValues;
    }
    Object.keys(newValues).forEach(field => {
      if (!this.updatableFields.includes(field)) {
        delete newValues[field];
      }
    });
    return newValues;
  };
}

export default class BaseController {
  constructor(service) {
    this.allowedQueryParams = [];
    this.service = service;
    this.includeTotalCountInGetAll = false;
    this.parsableQueryParams = [];
  }

  create = async (req, res) => {
    const newDoc = await this.service.createDoc(req.body);
    if (newDoc.errors) {
      this.sendErrors(res, newDoc.errors);
    } else {
      res.status(201).send(newDoc);
    }
  };

  getAll = async (req, res) => {
    try {
      const queryFields = this.filterQueryFields(req.query);
      const allDocs = await this.service.getAll({
        ...queryFields,
        userId: req.user._id,
      });
      let data = null;
      if (this.includeTotalCountInGetAll) {
        delete queryFields.skip;
        delete queryFields.limit;
        console.log('includeTotalCountInGetAll', queryFields);
        const totalCount = await this.service.model.countDocuments({
          ...queryFields,
          userId: req.user._id,
        });
        data = { rows: allDocs, totalCount };
      }
      res.status(200).send(data || allDocs);
    } catch (e) {
      console.error('BaseController getAll', e);
    }
  };

  getById = async (req, res) => {
    try {
      const doc = await this.service.getById(req.params.id);
      res.status(200).send(doc);
    } catch (e) {
      console.error('BaseController getById', e);
      this.sendErrors(res, e);
    }
  };

  updateById = async (req, res) => {
    try {
      const doc = await this.service.updateById(req.params.id, req.body);
      res.status(200).send(doc);
    } catch (e) {
      console.error('BaseController updateById', e);
      this.sendErrors(res, e);
    }
  };

  filterQueryFields = query => {
    const queryFields = query || {};
    Object.keys(queryFields).forEach(field => {
      if (!this.allowedQueryParams.includes(field)) {
        delete queryFields[field];
      } else if (Array.isArray(queryFields[field])) {
        queryFields[field] = { $in: queryFields[field] };
      }
    });
    if (this.customizeQueryFields) {
      return this.customizeQueryFields(queryFields);
    }
    return queryFields;
  };

  sendData = (res, data) => {
    res.status(200).send(data);
  };

  sendErrors = (res, errors, statusCode = 400) => {
    res.status(statusCode).send({ errors });
  };

  errorLog = error => {
    console.log('error', error);
  };
}

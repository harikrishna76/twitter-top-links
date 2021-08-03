import mongoose from 'mongoose';

import { createValidator } from './validatorHelpers';

export function createSchemaWithValidators(schemaFields) {
  const schemaValidator = createValidator(schemaFields);
  const newSchema = {};
  schemaFields.forEach(field => {
    newSchema[field.key] = { ...field, ...schemaValidator[field.key] };
    newSchema[field.key].type = field.type || String;
    ['key', 'name'].forEach(key => {
      delete newSchema[field.key][key];
    });
  });
  return new mongoose.Schema(newSchema);
}

export function isValue(value) {
  return !['', undefined, null].includes(value);
}

export default {};

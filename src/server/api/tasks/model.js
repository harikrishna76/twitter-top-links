import mongoose from 'mongoose';
import { createSchemaWithValidators } from '../utils/apiHelpers';

const MODEL = 'tasks';

const { Types } = mongoose.Schema;

delete mongoose.connection.models[MODEL]; // server auto refersh issue had to add this

const schemaFields = [
  { key: 'type' },
  { key: 'status' },
  { key: 'finished', type: Types.Boolean, required: false },
  { key: 'userId', type: Types.ObjectId, ref: 'user' },
];

const schema = createSchemaWithValidators(schemaFields);

export default mongoose.model(MODEL, schema);

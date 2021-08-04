import mongoose from 'mongoose';
import { createSchemaWithValidators } from '../utils/apiHelpers';

const MODEL = 'user';

// const { Types } = mongoose.Schema;

delete mongoose.connection.models[MODEL]; // server auto refersh issue had to add this

const schemaFields = [
  { key: 'id' },
  { key: 'displayName' },
  { key: 'username' },
  { key: 'provider' },
  { key: 'profile_image_url_https', required: false },
];

const schema = createSchemaWithValidators(schemaFields);

export default mongoose.model(MODEL, schema);

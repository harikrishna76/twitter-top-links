import mongoose from 'mongoose';
import { createSchemaWithValidators } from '../utils/apiHelpers';

const MODEL = 'user_stats';

const { Types } = mongoose.Schema;

delete mongoose.connection.models[MODEL]; // server auto refersh issue had to add this

const schemaFields = [
  { key: 'id' },
  { key: 'name' },
  { key: 'screen_name' },
  { key: 'tweets', type: Types.Number },
  { key: 'urlsCount', type: Types.Number },
  { key: 'profile_image_url_https', required: false },
  { key: 'userId', type: Types.ObjectId, ref: 'user' },
];

const schema = createSchemaWithValidators(schemaFields);

export default mongoose.model(MODEL, schema);

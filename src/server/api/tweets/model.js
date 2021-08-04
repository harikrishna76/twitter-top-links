import mongoose from 'mongoose';
import { createSchemaWithValidators } from '../utils/apiHelpers';

const MODEL = 'tweets';

const { Types } = mongoose.Schema;

delete mongoose.connection.models[MODEL]; // server auto refersh issue had to add this

const schemaFields = [
  { key: 'created_at' },
  { key: 'id' },
  { key: 'text' },
  { key: 'retweet_count', type: Types.Number },
  { key: 'favorite_count', type: Types.Number },
  { key: 'favorited', type: Types.Boolean },
  { key: 'retweeted', type: Types.Boolean },
  { key: 'reply_count', type: Types.Number, required: false },
  {
    key: 'entities',
    type: createSchemaWithValidators([
      {
        key: 'hashtags',
        type: [createSchemaWithValidators([{ key: 'text' }])],
        required: false,
      },
      {
        key: 'urls',
        type: [
          createSchemaWithValidators([
            { key: 'url' },
            { key: 'expanded_url' },
            { key: 'display_url' },
          ]),
        ],
      },
    ]),
  },
  {
    key: 'user',
    type: createSchemaWithValidators([
      { key: 'name' },
      { key: 'screen_name' },
      { key: 'description', required: false },
      { key: 'location', required: false },
      { key: 'profile_image_url_https', required: false },
    ]),
  },
  { key: 'userId', type: Types.ObjectId, ref: 'user' },
];

const schema = createSchemaWithValidators(schemaFields);

export default mongoose.model(MODEL, schema);

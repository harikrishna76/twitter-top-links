import mongoose from 'mongoose';

let count = 0;

const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  // geting rid off the depreciation errors
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = mongoDbUri => {
  console.log('MongoDB connection with retry');
  mongoose
    .connect(mongoDbUri, options)
    .then(() => {
      console.log('MongoDB is connected');
    })
    .catch(err => {
      console.log(
        'MongoDB connection unsuccessful, retry after 5 seconds. ',
        count,
        err,
      );
      count += 1;
      setTimeout(connect, 5000);
    });
};

export default { connect };

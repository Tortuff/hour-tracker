import { connect } from 'mongoose';

connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB has been successfully connected');
  })
  .catch(err => {
    console.error(err.message, '\n', err.stack);
    process.abort();
  });

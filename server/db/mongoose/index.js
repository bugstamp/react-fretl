import mongoose from 'mongoose';
import Promise from 'bluebird';

import config from '../../config';
import logger from '../../log';

const dbUri = config.any('MONGODB_URI', 'mongoose:uri');
const dbOptions = config.get('mongoose:options')

mongoose.connect(dbUri, dbOptions, err => {
  if (err) {
    logger.data('Couldn\'t connected to database');
    logger.error(err.stack);
    return;
  };
    
  logger.data('Connected to database');
});

mongoose.Promise = Promise;

export default mongoose;
import mongoose from 'mongoose';
import Promise from 'bluebird';

import config from '../../config';
import logger from '../../log';

const dbUri = config.get('mongoose:uri');
const dbOptions = config.get('mongoose:options')

mongoose.connect(dbUri, dbOptions, err => {
  if (err) {
    logger.error(err.stack);
    logger.data('Could not connected to database');
    return;
  };
    
  logger.data('Connected to database');
});

mongoose.Promise = Promise;

export default mongoose;
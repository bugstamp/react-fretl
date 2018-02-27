import logger from '../log';

export default (err, req, res, next) => {
  // if error is boom
  if (err.output) {
    // if boom error is server error
    if (err.isServer) {
      res.status(err.output.statusCode);
      res.send('Неудалось выполнить запрос, попробуйте перезагрузить страницу и попробовать снова');
      
      return res.on('finish', () => logger.error(err.stack));
    };
    // if boom error is http error
    const { statusCode, message } = err.output.payload;
    
    res.status(statusCode);
    res.send(message);
    
    return res.on('finish', () => logger.data(message));
  };
  // other errors
  return log.warn(err.stack);
};
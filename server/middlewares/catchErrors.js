import logger from '../log';

export default (err, req, res, next) => {
  if (err.output) {
    if (err.isServer) {
      res.status(err.output.statusCode);
      res.send('Неудалось выполнить запрос, попробуйте перезагрузить страницу и попробовать снова');
      
      return res.on('finish', () => logger.error(err.stack));
    };
    const { statusCode, message } = err.output.payload;
    
    res.status(statusCode);
    res.send(message);
    
    return res.on('finish', () => logger.data(message));
   }

  return log.warn(err.stack);
};
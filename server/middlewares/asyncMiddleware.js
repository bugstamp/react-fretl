import boom from 'boom';

export default (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
    if (!err.isBoom) {
      return next(boom.badImplementation(err));
    }
    next(err);
  });
};
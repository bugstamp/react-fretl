import db from '../db';
import asyncMiddleware from './asyncMiddleware';

export default asyncMiddleware(async (req, res, next) => {
  if(!req.session.user) {
    return next();
  }

  req.user = res.locals.user = req.session.user;
  next();
});
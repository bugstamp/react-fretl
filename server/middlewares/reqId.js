import uuid from 'uuid/v4';

export default (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    req.reqId = uuid();
  } else {
    global.reqId = 1 + (global.reqId || 0);

    req.reqId = global.reqId;
  }
    
  next();
};
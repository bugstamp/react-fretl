import onHeaders from 'on-headers';
import colors from 'colors';

import logger from '../log';

function getTimeColor(time) {
  time = time.toFixed(0);

  if (time > 10000) {
    return time.red;
  } else if (time > 3000) {
    return time.orange;
  }

  return time.green;
}

function getLevel(data) {
  const { statusCode } = data;

  if (statusCode >= 400 && statusCode < 500) {
      return 'warn';
    } else if (statusCode >= 500) {
      return 'error';
    }

  return 'info';
}

function logStart(data) {
  const { method, originalUrl, reqId, userId, ip } = data;

  return `${method} ${originalUrl} reqId=${reqId} userId=${userId} ip=${ip}`;
}

function logFinish(data) {
  const { method, originalUrl, statusCode, time, ip, reqId, } = data;

  return `${method} ${originalUrl}  ${statusCode}  ${getTimeColor(time)}ms  reqId=${reqId}`;
}

export default (req, res, next) => {
  const data = {};

  data.reqId = req.reqId;
  data.method = req.method;
  data.host = req.hostname;
  data.originalUrl = req.originalUrl;
  data.ip = req.ip || req.connection.remoteAdress || 
    req.socket || req.socket.remoteAdress;
  data.userId = req.user ? req.user.userId : undefined;
  
  const start = process.hrtime();

  function debugging() {
    logger.debug(logStart(data));
  }

  onHeaders(res, function onHeaders () {
    data.statusCode = res.statusCode;
    debugging();
  });

  function logging() {
    logger.log(getLevel(data), logFinish(data));
  }

  res.on('finish', () => {
    const end = process.hrtime(start);

    data.time = end[0] * 1e3 + end[1] * 1e-6;
    logging();
  });

  next();
};
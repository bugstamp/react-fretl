import { createLogger, format, transports } from 'winston';
import moment from 'moment';

import config from '../config';

const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

const myFormat = printf(info => {
  const tsFormat = moment().format('YYYY-MM-DD hh:mm:ss');

  return `${tsFormat} ${info.level}: ${info.message}`;
})

const configLevels = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'lime',
    info: 'green' 
  }
}

const myTransports = global.__ENV__ !== 'production' ?
  [
    new transports.Console(),
    new transports.File({
      filename: 'server/log/errors.log',
      level: 'error'
    })
  ]
  :
  [
    new transports.File({
      filename: 'server/log/info.log'
    }),
    new transports.File({
      filename: 'server/log/errors.log',
      level: 'error'
    })
  ];

const logger = createLogger({
  levels: configLevels.levels,
  format: combine(
    colorize(),
    myFormat
  ),
  transports: myTransports
});

export default logger;
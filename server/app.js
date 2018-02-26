import express from 'express';
import path from 'path';
import fs from 'fs';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import boom from 'boom';

import config from './config';
import db from './db';
import logger from './log';

import {
  asyncMiddleware,
  reqId,
  reqUser,
  reqLogger,
  catchErrors,
} from './middlewares';

import { 
  users,
  auth,
  products,
  cart,
  search,
} from './routers';

const app = express();

const __ENV__ = global.ENV = process.env.NODE_ENV || app.get('env');
const PUBLIC_DIR = path.join(__dirname, '../public/');
const HTML_FILE = path.join(PUBLIC_DIR, './index.html');
const DEFAULT_PORT = config.get('port');
const sessionConfig = config.get('session');

// if (__ENV__ === 'production')
//   db.loadProducts();

app.set('port', process.env.PORT || DEFAULT_PORT);

if (__ENV__ !== 'production')
  app.set('trust proxy', true);

app.use(express.static(PUBLIC_DIR));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride());
app.use(cors({ credentials: true }));
app.use(session({
  ...sessionConfig,
  store: db.sessionStore
}))
app.use(reqId);
app.use(reqUser);
app.use(reqLogger);
app.use(users);
app.use(auth);
app.use(products);
app.use(search);
app.use(cart);
app.use(catchErrors);

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.listen(app.get('port'), () => 
  logger.info(`Server is listening: http://localhost:${app.get('port')}`)
);
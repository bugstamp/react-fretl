import session from 'express-session';
import connectMongo from 'connect-mongo';

import mongoose from '../mongoose';

const MongoStore = connectMongo(session);
const store = new MongoStore({ mongooseConnection: mongoose.connection });

export default store;
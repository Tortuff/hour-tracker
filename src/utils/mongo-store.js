import session from 'express-session';
import MongoStore from 'connect-mongo';

/** @type { import('connect-mongo/build/main/lib/MongoStore').ConnectMongoOptions } */
const options = {
  mongoUrl: process.env.MONGO_URI,
  ttl: 24 * 60 * 60,
};

export const mongoStore = MongoStore.create(options);

export const MongoStoreMiddleware = session({
  secret: process.env.MONGO_STORE_SECRET,
  saveUninitialized: false,
  resave: true,
  cookie: {
    httpOnly: true,
    maxAge: options.ttl,
    signed: true,
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
  },
  store: mongoStore,
});

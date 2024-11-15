import { config } from './src/utils/config.js';
import './src/utils/mongo-connect.js';
import express from 'express';
import cors from 'cors';

import { appRouter } from './src/app-router.js';
import { MongoStoreMiddleware } from './src/utils/mongo-store.js';
import { exceptionMiddleware } from './src/utils/middlewares/exception.middleware.js';

const PORT = parseInt(config.PORT) || 3000;
const production = config.NODE_ENV === 'production';

const app = express();

app.disable('x-powered-by');

!production &&
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );

app.use(MongoStoreMiddleware);
app.use(express.json());
app.use(express.static('public'));
app.use(appRouter);
app.use(exceptionMiddleware);

app.listen(PORT, () => console.log(`App is running on ${PORT} port...`));

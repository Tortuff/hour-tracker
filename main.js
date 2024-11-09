import './src/utils/config.js';
import express from 'express';
import { appRouter } from './src/app-router.js';
import { MongoStoreMiddleware } from './src/utils/mongo-store.js';

const PORT = parseInt(process.env.PORT) || 3000;

const app = express();

app.disable('x-powered-by');

app.use(MongoStoreMiddleware);
app.use(express.json());
app.use(express.static('public'));
app.use(appRouter);

app.listen(PORT, () => console.log(`App is running on ${PORT} port...`));

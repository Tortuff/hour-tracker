import { Router } from 'express';
import { notFoundRoute } from './utils/not-found.js';
import { apiRouter } from './api/api-router.js';
import { join } from 'node:path';

const appRouter = Router();

console.log(`CWD: ${process.cwd()}`);

appRouter.use('/api', apiRouter);
appRouter.all('/', (_, res) => res.sendFile(join(process.cwd(), 'public', 'index.html')));
appRouter.all('*', notFoundRoute);

export { appRouter };

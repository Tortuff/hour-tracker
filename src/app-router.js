import { Router } from 'express';
import { notFoundApiRoute } from './utils/not-found.js';
import { apiRouter } from './api/api-router.js';
import { join } from 'node:path';

const appRouter = Router();

appRouter.use('/api', apiRouter);
appRouter.all('/', (_, res) => res.sendFile(join(process.cwd(), 'public', 'index.html')));
appRouter.all('*', notFoundApiRoute);

export { appRouter };

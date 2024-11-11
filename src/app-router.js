import { Router } from 'express';
import { apiRouter } from './api/api-router.js';
import { join } from 'node:path';

const appRouter = Router();

appRouter.use('/api', apiRouter);
appRouter.all('/*', (_, res) => res.sendFile(join(process.cwd(), 'public', 'index.html'), { maxAge: Infinity }));
appRouter.all('*', (_, res) => res.redirect('/404'));

export { appRouter };

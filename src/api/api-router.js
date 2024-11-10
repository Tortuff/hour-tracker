import { Router } from 'express';
import { youTrackRouter } from './youtrack/router.js';
import { jiraRouter } from './jira/router.js';
import { notFoundApiRoute } from '../utils/not-found.js';
import { appApiRouter } from './app/app.controller.js';

const apiRouter = Router();

apiRouter.use('/app', appApiRouter);
apiRouter.use('/yt', youTrackRouter);
apiRouter.use('/jira', jiraRouter);
apiRouter.all('*', notFoundApiRoute);

export { apiRouter };

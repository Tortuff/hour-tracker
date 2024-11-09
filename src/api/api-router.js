import { Router } from 'express';
import { youTrackRouter } from './youtrack/router.js';
import { jiraRouter } from './jira/router.js';
import { notFoundApiRoute } from '../utils/not-found.js';

const apiRouter = Router();

apiRouter.use('/yt', youTrackRouter);
apiRouter.use('/jira', jiraRouter);
apiRouter.all('*', notFoundApiRoute);

export { apiRouter };

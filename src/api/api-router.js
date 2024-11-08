import { Router } from 'express';
import { youTrackRouter } from './youtrack/router.js';
import { jiraRouter } from './jira/router.js';

const apiRouter = Router();

apiRouter.use('/yt', youTrackRouter);
apiRouter.use('/jira', jiraRouter);

export { apiRouter };

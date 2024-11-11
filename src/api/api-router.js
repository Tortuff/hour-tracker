import { Router } from 'express';
import { youTrackRouter } from './youtrack/router.js';
import { jiraRouter } from './jira/router.js';
import { appApiRouter } from './app/app.controller.js';
import { NotFoundException } from '../utils/exceptions/not-found.exception.js';

const apiRouter = Router();

apiRouter.use(appApiRouter);
apiRouter.use('/yt', youTrackRouter);
apiRouter.use('/jira', jiraRouter);

apiRouter.all('*', () => {
  throw new NotFoundException();
});

export { apiRouter };

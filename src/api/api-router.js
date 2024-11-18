import { Router } from 'express';
import { appApiRouter } from './app/app.controller.js';
import { NotFoundException } from '../utils/exceptions/not-found.exception.js';
import { youTrackController } from './youtrack/youtrack.controller.js';
import { jiraController } from './jira/router.js';

const apiRouter = Router();

apiRouter.use(appApiRouter);
apiRouter.use('/yt', youTrackController);
apiRouter.use('/jira', jiraController);

apiRouter.all('*', () => {
  throw new NotFoundException();
});

export { apiRouter };

import { Router } from 'express';
import { authController } from './auth/auth.controller.js';
import { userController } from './user/user.controller.js';
import { taskController } from './task/task.controller.js';
import { workLogController } from './work-log/work-log.controller.js';

const appApiRouter = Router();

appApiRouter.use('/time', workLogController);
appApiRouter.use('/task', taskController);
appApiRouter.use('/auth', authController);
appApiRouter.use('/user', userController);

export { appApiRouter };

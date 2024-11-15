import { Router } from 'express';
import { authController } from './auth/auth.controller.js';
import { userController } from './user/user.controller.js';
import { taskController } from './task/task.controller.js';

const appApiRouter = Router();

appApiRouter.use('/auth', authController);
appApiRouter.use('/user', userController);
appApiRouter.use('/task', taskController);

export { appApiRouter };

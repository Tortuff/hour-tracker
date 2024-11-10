import { Router } from 'express';
import { authController } from './auth/auth.controller.js';

const appApiRouter = Router();

appApiRouter.use(authController);

export { appApiRouter };

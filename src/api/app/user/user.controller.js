import { Router } from 'express';
import { create } from './user.service.js';
import { validateCreateUser } from './validators/create-user.validator.js';

const userController = Router();

userController.post('/', ...validateCreateUser(), create);

export { userController };

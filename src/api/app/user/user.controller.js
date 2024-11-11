import { Router } from 'express';
import { create } from './user.service.js';
import { createValidator } from './validators/create.validator.js';

const userController = Router();

userController.post('/', createValidator, create);

export { userController };

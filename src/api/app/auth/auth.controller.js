import { Router } from 'express';
import { validateLogin } from './validators/login.validator.js';
import { login, logout, returnMe } from './auth.service.js';
import { authorized } from './validators/authorized.validator.js';

const authController = Router();

authController.post('/login', validateLogin, login);
authController.get('/me', authorized, returnMe);
authController.get('/logout', authorized, logout);

export { authController };

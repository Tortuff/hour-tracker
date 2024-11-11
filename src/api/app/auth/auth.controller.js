import { Router } from 'express';
import { validateLoginRequest } from './validators/login.validator.js';
import { login, returnMe } from './auth.service.js';

const authController = Router();

authController.post('/login', validateLoginRequest, login);
authController.get('/me', returnMe);
// authController.post('/logout', validateLoginRequest, login);

export { authController };
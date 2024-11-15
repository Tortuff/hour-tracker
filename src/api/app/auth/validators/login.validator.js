import { body } from 'express-validator';
import { ExpressValidator } from '../../../../utils/middlewares/express-validators.middleware.js';

export const validateLogin = () => [body('login').isString(), body('password').isString(), ExpressValidator.validate()];

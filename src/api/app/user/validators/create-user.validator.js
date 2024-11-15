import { body } from 'express-validator';
import { ExpressValidator } from '../../../../utils/middlewares/express-validators.middleware.js';

export const validateCreateUser = () => [
  body('login').isString().isLength({ min: 3, max: 64 }),
  body('password').isStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1 }).isLength({ max: 64 }),
  body('admin').optional().isBoolean().default(false),
  body('name').isString().isLength({ min: 2, max: 64 }),
  body('surname').isString().isLength({ min: 2, max: 64 }),
  ExpressValidator.validate(),
];

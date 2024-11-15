import { body } from 'express-validator';
import { ExpressValidator } from '../../../../utils/middlewares/express-validators.middleware.js';

export const updateTaskValidator = () => [
  body('code').isString().trim().isLength({ min: 2, max: 20 }),
  body('name').optional().isString().trim().isLength({ min: 2, max: 128 }),
  body('description').optional().isString().trim().isLength({ min: 0, max: 2048 }),
  ExpressValidator.validate(),
];

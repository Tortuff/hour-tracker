import { body } from 'express-validator';
import { validateDuration } from '../../../../utils/utils.js';
import { ExpressValidator } from '../../../../utils/middlewares/express-validators.middleware.js';

export const validateCreateWorkLog = () => [
  body('task').isString(),
  body('date').isDate(),
  body('duration')
    .isString()
    .custom(v => {
      if (validateDuration(v)) return v.trim();
      throw new Error('Invalid "duration"');
    }),
  ExpressValidator.validate(),
  ExpressValidator.whiteList('body'),
];

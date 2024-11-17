import { body } from 'express-validator';
import { isMongoId } from '../../../../utils/middlewares/validate-mongo-id.middleware.js';
import { ExpressValidator } from '../../../../utils/middlewares/express-validators.middleware.js';

export const validateBulkRemove = () => [
  body('ids')
    .isArray({ min: 1 })
    .custom(value => {
      if (!value.every(v => isMongoId(v))) {
        throw new Error('Invalid IDs provided');
      }

      return value;
    }),
  ExpressValidator.validate(),
];

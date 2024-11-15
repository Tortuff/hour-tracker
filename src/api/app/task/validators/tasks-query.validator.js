import { matchedData, query } from 'express-validator';
import { ExpressValidator } from '../../../../utils/middlewares/express-validators.middleware.js';

export const validateTasksQuery = () => [
  ...ExpressValidator.paginated('code'),
  query('searchText').optional().isString(),
  ExpressValidator.validate(),
  ExpressValidator.whiteList('query'),
];

import { check, matchedData, query, validationResult } from 'express-validator';
import { UnauthorizedException } from '../exceptions/unauthorized.exception.js';
import { ValidationException } from '../exceptions/validation.exception.js';
import mongoose from 'mongoose';

const groupBy = function (field) {
  const result = {};
  this.forEach(item => {
    const prop = item[field];
    result[prop]?.push(item) ?? (result[prop] = [item]);
  });
  return result;
};

const excludePagination = () => (req, _, next) => {
  Object.keys(req.query).forEach(key => ['sort', 'size', 'offset', 'sortBy'].includes(key) && delete req.query[key]);
};

const validate = () => (req, _, next) => {
  const result = validationResult(req);
  if (!result.errors?.length) return next();

  next(new ValidationException(groupBy.call(result.array(), 'path')));
};

const authorized = () => {
  return check('body').custom((_, { req }) => {
    if (!req.session.user.id) throw new UnauthorizedException();
  });
};

const paginated = defaultSort => {
  if (!defaultSort) throw new Error('Defaul forting field required!');

  return [
    query('limit').default(10).toInt().isInt({ min: 1 }).default(10),
    query('offset').default(0).toInt().isInt({ min: 0 }),
    query('sort').customSanitizer(v => (['asc', 'desc'].includes(v) ? v : 'asc')),
    query('sortBy').optional().isString(defaultSort),
    whiteList('query', 'pagination'),
  ];
};

const whiteList = (locations, requestProp) => {
  if (!locations) throw new Error('Location required');
  locations = Array.isArray(locations) ? locations : [locations];

  return (req, _, next) => {
    locations.forEach(location => {
      req[requestProp || location] = matchedData(req, { locations: [location] });
    });
    next();
  };
};

export const ExpressValidator = { authorized, validate, paginated, whiteList, excludePagination };

import { check, validationResult } from 'express-validator';
import { UnauthorizedException } from '../exceptions/unauthorized.exception.js';
import { ValidationException } from '../exceptions/validation.exception.js';

const groupBy = function (field) {
  const result = {};
  this.forEach(item => {
    const prop = item[field];
    result[prop]?.push(item) ?? (result[prop] = [item]);
  });
  return result;
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

export const ExpressValidator = { authorized, validate };

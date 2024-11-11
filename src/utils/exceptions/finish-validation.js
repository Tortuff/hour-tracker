import { BadRequestException } from './bad-request.exception.js';

export function finishValidation(errors, next) {
  if (!Object.values(errors).some(arr => arr.length)) return next();

  Object.entries(errors).forEach(([key, value]) => !value.length && (errors[key] = undefined));
  next(new BadRequestException('Login falied', errors));
}

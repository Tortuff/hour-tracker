import { finishValidation } from '../../../../utils/exceptions/finish-validation.js';

export function validateLoginRequest({ body: { login, password } }, res, next) {
  const errors = { login: [], password: [] };

  if (typeof login !== 'string') {
    errors.login.push('"login" must be a string');
  }
  if (typeof password !== 'string') {
    errors.password.push('"password" must be a string');
  }

  return finishValidation(errors, next);
}

import { isValidObjectId } from 'mongoose';
import { finishValidation } from '../../../../utils/exceptions/finish-validation.js';

const uppercase = /[A-Z]/;
const lowercase = /[a-z]/;
const numbers = /[0-9]/;

export function createValidator(req, res, next) {
  const errors = { tenant: [], login: [], name: [], surname: [], password: [], admin: [] };
  const { tenant, login, name, surname, password, admin } = req.body;

  // tenant ID
  if (typeof tenant !== 'string') {
    errors.tenant.push('"tenant" must be a string');
  }
  if (!isValidObjectId(tenant)) {
    errors.tenant.push('"tenant" must be a valid ObjectId');
  }

  // password
  if (typeof password !== 'string') {
    errors.password.push('"password" must be a string');
  }
  if (password?.length < 8) {
    errors.password.push('"password" length must be 8 or more');
  }
  if (password?.length > 64) {
    errors.password.push('"password" length must be 64 or less');
  }
  if (!uppercase.test(password ?? '')) {
    errors.password.push('"password" must have at least one uppercase latter');
  }
  if (!lowercase.test(password ?? '')) {
    errors.password.push('"password" must have at least one lowercase latter');
  }
  if (!numbers.test(password ?? '')) {
    errors.password.push('"password" must have at least one number');
  }

  // login
  if (typeof login !== 'string') {
    errors.login.push('"login" must be a string');
  }
  if (login?.length < 3) {
    errors.login.push('"login" length must be 3 or more');
  }
  if (login?.length > 64) {
    errors.login.push('"login" length must be 64 or less');
  }

  // name
  if (typeof name !== 'string') {
    errors.name.push('"name" must be a string');
  }
  if (name?.length < 3) {
    errors.name.push('"name" length must be 3 or more');
  }
  if (name?.length > 64) {
    errors.name.push('"name" length must be 64 or less');
  }

  // surname
  if (typeof surname !== 'string') {
    errors.surname.push('"surname" must be a string');
  }
  if (surname?.length < 3) {
    errors.surname.push('"surname" length must be 3 or more');
  }
  if (surname?.length > 64) {
    errors.surname.push('"surname" length must be 64 or less');
  }

  // admin
  if (typeof admin === 'unedined' || typeof admin !== 'boolean') {
    errors.admin.push('"admin" must be a boolean value');
  }

  return finishValidation(errors, next);
}

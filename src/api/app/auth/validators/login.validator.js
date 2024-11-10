export function validateLoginRequest({ body: { login, password } }, res, next) {
  const errors = { login: [], password: [] };

  if (typeof login !== 'string') {
    errors.login.push('"login" must be a string');
  }
  if (typeof password !== 'string') {
    errors.password.push('"password" must be a string');
  }

  if (!Object.values(errors).some(arr => arr.length)) return next();

  Object.entries(errors).forEach(([key, value]) => !value.length && (errors[key] = undefined));
  errors.type = 'validation_exception';
  res.status(400).json(errors);
}

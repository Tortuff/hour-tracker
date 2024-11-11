import { Exception } from './base.exception.js';
import { InternalServerErrorException } from './internal-server-error.js';

export function exceptionMiddleware(err, req, res, next) {
  if (!(err instanceof Exception)) {
    err?.stack && console.error(`[ERROR] ${err.name}: ${err.message}\n${err.stack}`);
    res.status(err.status).json({ ...new InternalServerErrorException(err?.message) });
    return;
  }

  console.error(`[ERROR] ${err.name}: ${err.message}\n${err.stack}`);
  res.status(err.status).json({ ...err });
}

import { UnauthorizedException } from '../../../../utils/exceptions/unauthorized.exception.js';

export function authorized(req, _, next) {
  if (!req.session?.user) return next(new UnauthorizedException());
  next();
}

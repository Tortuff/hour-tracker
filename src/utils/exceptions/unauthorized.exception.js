import { Exception } from './base.exception.js';

export class UnauthorizedException extends Exception {
  error = 'unauthorized';
  message = 'Unauthorized';

  constructor(message) {
    super(401);
    message && (this.message = message);
  }
}

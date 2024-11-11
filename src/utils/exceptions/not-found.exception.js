import { Exception } from './base.exception.js';

export class NotFoundException extends Exception {
  error = 'not_found';
  message = 'Not found';

  constructor(message) {
    super(404);
    message && (this.message = message);
  }
}

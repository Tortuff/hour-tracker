import { Exception } from './base.exception.js';

export class ValidationException extends Exception {
  error = 'validation_error';
  message = 'Validation failed';

  constructor(payload) {
    super(400);
    payload && (this.payload = payload);
  }
}

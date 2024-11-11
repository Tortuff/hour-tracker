import { Exception } from './base.exception.js';

export class BadRequestException extends Exception {
  error = 'bad_request';
  message = 'Bad request';

  constructor(message, payload) {
    super(400);
    message && (this.message = message);
    payload && (this.payload = payload);
  }
}

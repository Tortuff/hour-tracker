import { Exception } from './base.exception.js';

export class ConflictException extends Exception {
  constructor(message, payload) {
    super(409);
    message && (this.message = message);
    payload && (this.payload = payload);
  }
}

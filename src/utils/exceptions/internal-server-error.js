import { Exception } from './base.exception.js';

export class InternalServerErrorException extends Exception {
  constructor(message) {
    super();
    message && (this.message = message);
  }
}

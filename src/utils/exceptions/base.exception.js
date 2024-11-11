export class Exception extends Error {
  status = 500;
  error = 'internal_server_error';
  message = 'Internal server error';

  constructor(status) {
    super();
    status && (this.status = status);
  }
}

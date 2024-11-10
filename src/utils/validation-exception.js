/**
 * @param {string} message
 * @param {string} body
 */
export function ValidationException(message, description) {
  return {
    type: 'validation_error',
    message,
    description,
  };
}

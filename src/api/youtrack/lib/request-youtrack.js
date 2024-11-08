const YOUTRACK_URI = process.env.YOUTRACK_URI;
const YOUTRACK_TOKEN = process.env.YOUTRACK_API_TOKEN;

const headers = {
  Authorization: 'Bearer ' + YOUTRACK_TOKEN,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/**
 * @param {string} path - "/api" is pre-defined
 * @param {RequestInit} options - standard fetch options
 * @returns { Promise<Response> }
 */
export function requestYouTrack(path, options = {}) {
  return fetch(YOUTRACK_URI + '/api' + path, { headers, ...options });
}

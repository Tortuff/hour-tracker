const JIRA_URI = process.env.JIRA_URI;
const JIRA_TOKEN = process.env.JIRA_API_TOKEN;

const headers = {
  Authorization: 'Basic ' + Buffer.from(`evgeniy98belykh@gmail.com:${JIRA_TOKEN}`).toString('base64'),
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/**
 * @param {string} path - "/rest" is pre-defined
 * @param {RequestInit} options - standard fetch options
 * @returns { Promise<Response> }
 */
export function requestJira(path, options = {}) {
  return fetch(JIRA_URI + '/rest' + path, { headers, ...options });
}

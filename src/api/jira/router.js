import { Router } from 'express';
import { requestJira } from './lib/send-request-jira.js';

const jiraController = Router();

jiraController.get('/issues/:id', async (req, res) => {
  const response = await requestJira(`/agile/1.0/issue/${req.params.id}`);
  res.status(response.status).json(await response.json());
});

jiraController.get('/issues/:id/times', async (req, res) => {
  const response = await requestJira(`/api/2/issue/${req.params.id}/worklog`);
  res.status(response.status).json(await response.json());
});

jiraController.post('/issues/:id/times', async (req, res) => {
  const response = await requestJira(`/api/2/issue/${req.params.id}/worklog`, {
    method: 'POST',
    body: JSON.stringify(req.body),
  });
  res.status(response.status).json(await response.json());
});

export { jiraController };

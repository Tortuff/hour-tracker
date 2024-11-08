import { Router } from 'express';
import { YouTrackIssueFields } from './request-fields/issues.js';
import { YouTrackWorkItemFields } from './request-fields/work-item.js';
import { requestYouTrack } from './lib/request-youtrack.js';

const youTrackRouter = Router();

youTrackRouter.get('/issues/:id', async (req, res) => {
  const response = await requestYouTrack(`/issues/${req.params.id}?fields=${YouTrackIssueFields}`);
  res.status(response.status).json(await response.json());
});

youTrackRouter.get('/issues/:id/times', async (req, res) => {
  const response = await requestYouTrack(`/issues/${req.params.id}/timeTracking/workItems?fields=${YouTrackWorkItemFields}`);
  res.status(response.status).json(await response.json());
});

youTrackRouter.get('/issues/:id/times', async (req, res) => {
  const response = await requestYouTrack(`/issues/${req.params.id}/timeTracking/workItems?fields=${YouTrackWorkItemFields}`);
  res.status(response.status).json(await response.json());
});

youTrackRouter.post('/issues/:issueId/times', async (req, res) => {
  const response = await requestYouTrack(
    `/issues/${req.params.issueId}/timeTracking/workItems?fields=${YouTrackWorkItemFields}`,
    { method: 'POST', body: JSON.stringify(req.body) },
  );
  res.status(response.status).json(await response.json());
});

youTrackRouter.get('/issues', async (req, res) => {
  const response = await requestYouTrack(`/issues?fields=${YouTrackIssueFields}`);
  res.status(response.status).json(await response.json());
});

export { youTrackRouter };

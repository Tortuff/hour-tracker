import { requestYouTrack } from './lib/send-request-youtrack.js';
import { YouTrackIssueFields } from './request-fields/issues.js';
import { YouTrackWorkItemFields } from './request-fields/work-item.js';

export async function getOne(req, res, next) {
  const response = await requestYouTrack(`/issues/${req.params.id}?fields=${YouTrackIssueFields}`);
  const json = await response.json().catch(next);
  json && res.status(response.status).json(json);
}

export async function getTimes(req, res, next) {
  const response = await requestYouTrack(`/issues/${req.params.id}/timeTracking/workItems?fields=${YouTrackWorkItemFields}`);
  const json = await response.json().catch(next);
  json && res.status(response.status).json(json);
}

export async function createWorkItem(req, res, next) {
  const response = await requestYouTrack(
    `/issues/${req.params.issueId}/timeTracking/workItems?fields=${YouTrackWorkItemFields}`,
    { method: 'POST', body: JSON.stringify(req.body) },
  );
  const json = await response.json().catch(next);
  json && res.status(response.status).json(json);
}

export async function getIssues(_, res, next) {
  const response = await requestYouTrack(`/issues?fields=${YouTrackIssueFields}`);
  const json = await response.json().catch(next);
  json && res.status(response.status).json();
}

import { Router } from 'express';
import { createWorkItem, getIssues, getOne, getTimes } from './youtrack.service.js';

const youTrackController = Router();

youTrackController.post('/issues/:issueId/times', createWorkItem);
youTrackController.get('/issues/:id/times', getTimes);
youTrackController.get('/issues/:id', getOne);
youTrackController.get('/issues', getIssues);

export { youTrackController };

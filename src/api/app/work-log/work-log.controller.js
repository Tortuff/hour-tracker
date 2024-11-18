import { Router } from 'express';
import { create } from './work-log.service.js';
import { validateCreateWorkLog } from './validators/create-work-log.validator.js';
import { authorized } from '../auth/validators/authorized.validator.js';

const workLogController = Router();
workLogController.use(authorized);

workLogController.post('/', ...validateCreateWorkLog(), create);

export { workLogController };

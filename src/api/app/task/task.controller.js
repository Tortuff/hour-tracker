import { Router } from 'express';
import { validateMongoId } from '../../../utils/middlewares/validate-mongo-id.middleware.js';
import { authorized } from '../auth/validators/authorized.validator.js';
import { bulkRemove, createTask, getTask, getTasks, removeTask, updateTask } from './task.service.js';
import { validateCreateTask } from './validators/create-task.validator.js';
import { validateUpdateTask } from './validators/update-task.validator.js';
import { validateTasksQuery } from './validators/tasks-query.validator.js';

const taskController = Router();
taskController.use(authorized);

taskController.get('/', ...validateTasksQuery(), getTasks);
taskController.get('/:id', validateMongoId(), getTask);
taskController.delete('/', bulkRemove);
taskController.delete('/:id', validateMongoId(), removeTask);
taskController.post('/', ...validateCreateTask(), createTask);
taskController.post('/:id', validateMongoId(), ...validateUpdateTask(), updateTask);

export { taskController };

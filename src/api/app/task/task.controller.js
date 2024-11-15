import { Router } from 'express';
import { validateMongoId } from '../../../utils/middlewares/validate-mongo-id.middleware.js';
import { authorized } from '../auth/validators/authorized.validator.js';
import { bulkRemove, createTask, getTask, getTasks, removeTask, updateTask } from './task.service.js';
import { validateCreateTask } from './validators/create-task.validator.js';
import { updateTaskValidator } from './validators/update-task.validator.js';

const taskController = Router();
taskController.use(authorized);

taskController.get('/', getTasks);
taskController.get('/:id', validateMongoId(), getTask);
taskController.delete('/', bulkRemove);
taskController.delete('/:id', validateMongoId(), removeTask);
taskController.post('/', ...validateCreateTask(), createTask);
taskController.post('/:id', validateMongoId(), updateTaskValidator, updateTask);

export { taskController };

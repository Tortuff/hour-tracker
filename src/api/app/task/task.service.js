import { BadRequestException } from '../../../utils/exceptions/bad-request.exception.js';
import { NotFoundException } from '../../../utils/exceptions/not-found.exception.js';
import { TaskModel } from '../../../utils/schemas/task.schema.js';
import { documentToTaskResposeDto } from './mappers.js';

export async function getTask(req, res, next) {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) return next(new NotFoundException());
    res.json(documentToTaskResposeDto(task));
  } catch (e) {
    next(e);
  }
}

export async function getTasks(req, res, next) {
  res.send('OK');
}

export async function removeTask(req, res, next) {
  res.send('OK');
}

export async function createTask(req, res, next) {
  const task = new TaskModel(req.body);
  const validate = task.validateSync();

  if (validate?.errors?.length) {
    return next(new BadRequestException(null, validate.errors));
  }

  if (!(await task.save().catch(next))) return;
  res.json(documentToTaskResposeDto(task));
}

export async function updateTask(req, res, next) {
  res.send('OK');
}

export async function bulkRemove(req, res, next) {
  res.send('OK');
}

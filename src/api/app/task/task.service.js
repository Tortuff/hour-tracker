import { mongo } from 'mongoose';
import { NotFoundException } from '../../../utils/exceptions/not-found.exception.js';
import { ValidationException } from '../../../utils/exceptions/validation.exception.js';
import { TaskModel } from '../../../utils/schemas/task.schema.js';

export async function getTask(req, res, next) {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) return next(new NotFoundException());
    res.json(task.toResponseDTO());
  } catch (e) {
    next(e);
  }
}

export async function getTasks(req, res, next) {
  const query = TaskModel.where();

  query.limit(req.pagination.limit);
  query.skip(req.pagination.offset);
  query.sort();

  if (req.query.searchText) {
    query
      .find({ $text: { $search: req.query.searchText } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } });
  }

  const tasks = await query.exec().catch(next);
  if (!tasks) return;

  res.json(tasks.map(t => t.toResponseDTO()));
}

export async function removeTask(req, res, next) {
  const task = await TaskModel.findById(req.params.id);
  if (!task) return next(new NotFoundException());

  if (!(await task.deleteOne().catch(next))) return;
  res.json(task.toResponseDTO());
}

export async function createTask(req, res, next) {
  const task = new TaskModel(req.body);
  const validate = task.validateSync();

  if (validate?.errors?.length) {
    return next(new ValidationException(validate.errors));
  }

  if (!(await task.save().catch(next))) return;
  res.json(task.toResponseDTO());
}

export async function updateTask(req, res, next) {
  const task = await TaskModel.findById(req.params.id);
  if (!task) return next(new NotFoundException());

  if (!Object.entries(req.body).length) {
    return res.json(task.toResponseDTO());
  }

  Object.entries(req.body).forEach(([key, value]) => (task[key] = value));
  if (!(await task.save().catch(next))) return;

  res.json(task.toResponseDTO());
}

export async function bulkRemove(req, res, next) {
  const uniqueIds = Array.from(new Set(req.body.ids)).map(v => new mongo.ObjectId(v));
  const tasks = await TaskModel.find({ _id: { $in: uniqueIds } });

  if (!tasks.length) return next(new NotFoundException());

  const deleted = await Promise.all(tasks.map(t => t.deleteOne())).catch(next);
  if (!deleted) return;

  return res.json(tasks.map(t => t.toResponseDTO()));
}

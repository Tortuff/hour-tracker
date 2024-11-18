import { ValidationException } from '../../../utils/exceptions/validation.exception.js';
import { WorkLogModel } from '../../../utils/schemas/work-log.schema.js';

export async function create(req, res, next) {
  const dto = { ...req.body, spentMins: req.body.duration, user: req.session.user.id };
  dto.createdBy = dto.updateBy = req.session.user.id;

  const work = new WorkLogModel(dto);
  const validate = work.validateSync();

  if (validate?.errors?.length) {
    return next(new ValidationException(validate.errors));
  }

  if (!(await work.save().catch(next))) return;
  res.status(201).json();
}

export function update(req, res, next) {
  res.send('OK');
}

export function remove(req, res, next) {
  res.send('OK');
}

export function bulkRemove(req, res, next) {
  res.send('OK');
}

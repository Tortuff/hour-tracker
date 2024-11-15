import { Types } from 'mongoose';
import { BadRequestException } from '../../../utils/exceptions/bad-request.exception.js';
import { UserModel } from '../../../utils/schemas/user.schema.js';
import { CryptoService } from '../../../utils/services/crypto.service.js';

export async function create(req, res, next) {
  const { tenant, login, name, surname, password, admin } = req.body;

  const model = new UserModel({ tenant, login, name, surname, password, admin });
  model.tenant = new Types.ObjectId(tenant);

  const salt = (model.salt = await CryptoService.generateSalt());
  model.password = await CryptoService.generatePassword(salt, password);

  const validated = model.validateSync();
  if (validated?.errors?.length) {
    return next(new BadRequestException('Validation failed', validated.errors));
  }

  if (!(await model.save().catch(next))) return;

  res.status(201).json(model.toResponseDTO());
}

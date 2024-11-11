import mongoose from 'mongoose';
import { UserModel } from '../../../utils/schemas/user.schema.js';
import { BadRequestException } from '../../../utils/exceptions/bad-request.exception.js';
import { userModelToResponseDto } from '../auth/mappers.js';
import { CryptoService } from '../../../utils/services/crypto.service.js';
import { InternalServerErrorException } from '../../../utils/exceptions/internal-server-error.js';

export async function create(req, res, next) {
  const { tenant, login, name, surname, password, admin } = req.body;

  const model = new UserModel({ tenant, login, name, surname, password, admin });
  model.tenant = new mongoose.Types.ObjectId(tenant);

  const salt = (model.salt = await CryptoService.generateSalt());
  model.password = await CryptoService.generatePassword(salt, password);

  const validated = model.validateSync();
  if (validated?.errors?.length) {
    return next(new BadRequestException('Validation failed', validated.errors));
  }

  try {
    await model.save();
  } catch (e) {
    if (e?.code === 11000) {
      const mongoError = new BadRequestException('Login already exists', e.errorResponse);
      mongoError.type = 'mongo';
      return next(mongoError);
    }

    return next(new InternalServerErrorException(e.message));
  }

  res.status(201).json(userModelToResponseDto(model));
}

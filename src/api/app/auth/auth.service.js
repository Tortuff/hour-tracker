import { UnauthorizedException } from '../../../utils/exceptions/unauthorized.exception.js';
import { UserModel } from '../../../utils/schemas/user.schema.js';
import { CryptoService } from '../../../utils/services/crypto.service.js';
import { userModelToResponseDto } from './mappers.js';

async function login(req, res, next) {
  const { login, password } = req.body;
  const user = await UserModel.findOne({ login });

  if (!user) return next(new UnauthorizedException());

  const isPwdValid = await CryptoService.hasEqualPasswords(user, password);
  if (!isPwdValid) return next(new UnauthorizedException());

  req.session.user = userModelToResponseDto(user);
  res.json(req.session.user);
}

async function returnMe(req, res, next) {
  if (!req.session?.user) {
    return next(new UnauthorizedException());
  }
  res.json(req.session.user);
}

export { login, returnMe };

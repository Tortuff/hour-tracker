import { UnauthorizedException } from '../../../utils/exceptions/unauthorized.exception.js';
import { UserModel } from '../../../utils/schemas/user.schema.js';
import { CryptoService } from '../../../utils/services/crypto.service.js';

export async function login(req, res, next) {
  if (req.session?.user) {
    req.session.touch();
    const error = await new Promise(res => req.session.save(res));
    return error ? next(error) : res.json(req.session.user);
  }

  const { login, password } = req.body;
  const user = await UserModel.findOne({ login });

  if (!user) return next(new UnauthorizedException());

  const isPwdValid = await CryptoService.hasEqualPasswords(user, password);
  if (!isPwdValid) return next(new UnauthorizedException());

  req.session.user = user.toResponseDTO();
  res.json(req.session.user);
}

export async function returnMe(req, res, next) {
  res.json(req.session.user);
}

export async function logout(req, res, next) {
  const error = await new Promise(res => req.session.destroy(res));
  error ? next(error) : res.end();
}

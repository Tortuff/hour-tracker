import { mongo } from 'mongoose';
import { BadRequestException } from '../exceptions/bad-request.exception.js';

export function validateMongoId(paramName = 'id') {
  return function (req, _, next) {
    return next(
      mongo.ObjectId.isValid(req.params[paramName])
        ? undefined
        : new BadRequestException(`Parameter "${paramName}" must be a MongoID string`),
    );
  };
}

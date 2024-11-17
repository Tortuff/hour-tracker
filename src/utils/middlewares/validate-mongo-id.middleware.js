import { mongo } from 'mongoose';
import { BadRequestException } from '../exceptions/bad-request.exception.js';

export const isMongoId = id => mongo.ObjectId.isValid(id);

export function validateMongoId(paramName = 'id') {
  return function (req, _, next) {
    return next(
      isMongoId(req.params[paramName])
        ? undefined
        : new BadRequestException(`Parameter "${paramName}" must be a MongoID string`),
    );
  };
}

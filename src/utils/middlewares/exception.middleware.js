import mongoose from 'mongoose';
import { Exception } from '../exceptions/base.exception.js';
import { InternalServerErrorException } from '../exceptions/internal-server-error.js';
import { ConflictException } from '../exceptions/conflict.exception.js';

const MongoError = mongoose.mongo.MongoError;

export function exceptionMiddleware(err, req, res, next) {
  if (err instanceof Exception) {
    console.error(`[ERROR] ${err.name}: ${err.message}\n${err.stack}`);
    return res.status(err.status).json(err);
  }

  if (err instanceof MongoError) {
    if (err?.code === 11000) {
      const paths = Object.keys(err?.keyPattern);
      return res.json(new ConflictException(`Duplicated value by key "${paths.join()}"`, { paths }));
    }
  }

  err?.stack && console.error(`[ERROR] ${err.name}: ${err.message}\n${err.stack}`);
  res.status(500).json(new InternalServerErrorException(err?.message));
  return;
}

import { Model, model, Schema, Types } from 'mongoose';
import { SchemaRef } from './schema-ref.js';

export const WorkLogSchema = Schema({
  user: {
    type: Types.ObjectId,
    required: true,
    ref: SchemaRef.User,
  },
  task: {
    type: Types.ObjectId,
    required: true,
    ref: SchemaRef.Task,
  },
  spentMins: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
  },

  updatedOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedBy: {
    type: Types.ObjectId,
    required: true,
    ref: SchemaRef.User,
  },
  createOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createBy: {
    type: Types.ObjectId,
    required: true,
    ref: SchemaRef.User,
  },
});

WorkLogSchema.pre('validate', function () {
  this.updatedOn = Date.now();
});

export const WorkLogModel = model(SchemaRef.WorkLog, WorkLogSchema);

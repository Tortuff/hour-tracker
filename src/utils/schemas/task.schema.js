import { model, Schema } from 'mongoose';
import { SchemaRef } from './schema-ref.js';

export const TaskSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      maxlength: 20,
      minlength: 2,
    },
    name: {
      type: String,
      required: false,
      maxlength: 128,
    },
    description: {
      type: String,
      required: false,
      maxlength: 2048,
    },
  },
  {
    strict: 'throw',
  },
);

TaskSchema.index(
  {
    name: 'text',
    code: 'text',
    description: 'text',
  },
  {
    weights: {
      code: 10,
      name: 5,
      description: 1,
    },
  },
);

TaskSchema.methods.toResponseDTO = function () {
  return {
    id: this._id.toString(),
    code: this.code,
    name: this.name,
    description: this.description,
  };
};

export const TaskModel = model(SchemaRef.Task, TaskSchema);

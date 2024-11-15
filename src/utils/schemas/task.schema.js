import { model, Schema } from 'mongoose';
import { SchemaRef } from './schema-ref.js';

export const TaskSchema = new Schema({
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
    minlength: 0,
  },
  description: {
    type: String,
    required: false,
    maxlength: 2048,
    minlength: 0,
  },
});

export const TaskModel = model(SchemaRef.Task, TaskSchema);

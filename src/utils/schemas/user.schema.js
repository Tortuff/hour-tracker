import { model, Schema, Types } from 'mongoose';
import { SchemaRef } from './schema-ref.js';

export const UserSchema = new Schema({
  // tenant: {
  //   type: Types.ObjectId,
  //   required: true,
  //   ref: SchemaRef.Tenant,
  // },

  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64,
  },

  surname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64,
  },

  login: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 64,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
    required: true,
  },

  admin: {
    type: Boolean,
    default: false,
  },

  defaults: {
    type: Object,
    default: {
      mergeWorklog: true,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.toResponseDTO = function () {
  return {
    id: this._id.toString(),
    admin: this.admin,
    name: this.name,
    surname: this.surname,
    login: this.login,
  };
};

export const UserModel = model(SchemaRef.User, UserSchema);

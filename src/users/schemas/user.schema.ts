import { Schema } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';

export const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

UserSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

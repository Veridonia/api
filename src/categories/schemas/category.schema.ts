import { Schema } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';

export const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

CategorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

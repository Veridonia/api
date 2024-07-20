import { Schema } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';

export const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Add category reference
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

PostSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

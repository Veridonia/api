import { Schema } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';

export const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    }, // Add category reference
    session: {
      type: Schema.Types.ObjectId,
      ref: 'Session',
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default: 7 days from now
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

PostSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

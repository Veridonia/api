// src/schemas/selected-category.schema.ts
import { Schema } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';
import { SoftDeleteDocument } from 'mongoose-delete';

export interface SelectedCategory extends SoftDeleteDocument {
  session: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
  deleted: boolean;
  deletedAt: Date;
}

export const SelectedCategorySchema = new Schema(
  {
    session: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { collection: 'selected_categories' },
);

SelectedCategorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

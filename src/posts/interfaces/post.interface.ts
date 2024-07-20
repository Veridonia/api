import { SoftDeleteDocument } from 'mongoose-delete';
import { Category } from '../../categories/interfaces/category.interface';

export interface Post extends SoftDeleteDocument {
  id?: string;
  title: string;
  content: string;
  author: string;
  category: Category | string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

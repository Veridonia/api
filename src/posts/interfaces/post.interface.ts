import { SoftDeleteDocument } from 'mongoose-delete';

export interface Post extends SoftDeleteDocument {
  id?: string;
  title: string;
  content: string;
  author: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

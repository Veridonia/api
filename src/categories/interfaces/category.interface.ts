import { SoftDeleteDocument } from 'mongoose-delete';

export interface Category extends SoftDeleteDocument {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

import { SoftDeleteDocument } from 'mongoose-delete';

export interface User extends SoftDeleteDocument {
  id?: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

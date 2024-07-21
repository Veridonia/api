import { Schema } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';
import { SoftDeleteDocument } from 'mongoose-delete';

export interface IPAddress extends SoftDeleteDocument {
  ip: string;
  createdAt: Date;
  deleted: boolean;
  deletedAt: Date;
}

export const IPAddressSchema = new Schema<IPAddress>({
  ip: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

IPAddressSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

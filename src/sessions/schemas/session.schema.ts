import { Schema } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';
import { SoftDeleteDocument } from 'mongoose-delete';

export interface Session extends SoftDeleteDocument {
  sessionId: string;
  isGuest: boolean;
  createdAt: Date;
  ipAddress: Schema.Types.ObjectId;
}

export const SessionSchema = new Schema<Session>({
  sessionId: { type: String, required: true, unique: true },
  isGuest: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  ipAddress: { type: Schema.Types.ObjectId, ref: 'IPAddress', required: true },
});

SessionSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

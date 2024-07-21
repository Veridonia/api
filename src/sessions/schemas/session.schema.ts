import { Schema } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';
import { SoftDeleteDocument } from 'mongoose-delete';

export interface Session extends SoftDeleteDocument {
  sessionId: string;
  isGuest: boolean;
  createdAt: Date;
  deleted: boolean;
}

export const SessionSchema = new Schema<Session>({
  sessionId: { type: String, required: true, unique: true },
  isGuest: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

SessionSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

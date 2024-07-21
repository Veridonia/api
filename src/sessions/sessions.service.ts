import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Session } from './schemas/session.schema';
import { SoftDeleteModel } from 'mongoose-delete';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel('Session')
    private readonly sessionModel: SoftDeleteModel<Session>,
  ) {}

  async startGuestSession(): Promise<Session> {
    const sessionId = uuidv4();
    const newSession = new this.sessionModel({ sessionId, isGuest: true });
    return newSession.save();
  }

  async endGuestSession(sessionId: string): Promise<void> {
    await this.sessionModel.delete({ sessionId });
  }

  async findSession(sessionId: string): Promise<Session | null> {
    return this.sessionModel.findOne({ sessionId });
  }
}

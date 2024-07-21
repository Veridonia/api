import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Session } from './schemas/session.schema';
import { SoftDeleteModel } from 'mongoose-delete';
import { IPAddressesService } from '../ip-addresses/ip-addresses.service';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel('Session')
    private readonly sessionModel: SoftDeleteModel<Session>,
    private readonly ipAddressesService: IPAddressesService,
  ) {}

  async startGuestSession(ip: string): Promise<Session> {
    const sessionId = uuidv4();
    const ipAddress = await this.ipAddressesService.findOrCreate(ip);
    const newSession = new this.sessionModel({
      sessionId,
      isGuest: true,
      ipAddress: ipAddress._id,
    });
    return newSession.save();
  }

  async endGuestSession(sessionId: string): Promise<void> {
    await this.sessionModel.delete({ sessionId });
  }

  async findSession(sessionId: string): Promise<Session | null> {
    return this.sessionModel.findOne({ sessionId }).populate('ipAddress');
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Session } from './schemas/session.schema';
import { SoftDeleteModel } from 'mongoose-delete';
import { IPAddressesService } from '../ip-addresses/ip-addresses.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel('Session')
    private readonly sessionModel: SoftDeleteModel<Session>,
    private readonly ipAddressesService: IPAddressesService,
  ) {}

  async startGuestSession(ip: string): Promise<Session> {
    const sessionId = uuidv4();

    let username: string;
    let isUnique: boolean = false;

    // Loop until a unique username is found
    do {
      username = faker.internet.userName();
      const existingUser = await this.sessionModel.findOne({ username });
      isUnique = !existingUser;
    } while (!isUnique);

    const ipAddress = await this.ipAddressesService.findOrCreate(ip);
    const newSession = new this.sessionModel({
      sessionId,
      username,
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

  async isUsernameUnique(username: string): Promise<boolean> {
    const sessionsCount = await this.sessionModel.countDocuments({ username });
    return sessionsCount === 0;
  }

  async updateUsername(sessionId: string, newUsername: string) {
    return await this.sessionModel.updateOne(
      { sessionId },
      { username: newUsername },
    );
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Session } from './schemas/session.schema';
import { SoftDeleteModel } from 'mongoose-delete';
import { IPAddressesService } from '../ip-addresses/ip-addresses.service';
import { faker } from '@faker-js/faker';
import { SelectedCategoriesService } from 'src/selected-categories/selected-categories.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateSelectedCategoryDto } from 'src/selected-categories/dto/create-selected-category.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel('Session')
    private readonly sessionModel: SoftDeleteModel<Session>,
    private readonly ipAddressesService: IPAddressesService,
    private readonly selectedCategoriesService: SelectedCategoriesService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async startGuestSession(ip: string): Promise<Session> {
    const sessionId = uuidv4();

    let username: string;
    let isUnique: boolean = false;

    try {
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
      const session = await newSession.save();

      const worldCategory = await this.categoriesService.findByName('World');
      const selectedCategoryDto: CreateSelectedCategoryDto = {
        categoryId: worldCategory._id as string,
        sessionId: session.sessionId,
      };

      await this.selectedCategoriesService.createSelectedCategory(
        selectedCategoryDto,
      );

      return session;
    } catch (e) {
      console.error(e);
      throw e;
    }
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

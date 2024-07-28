import { Controller, Post, Query } from '@nestjs/common';
import { FakerService } from './faker.service';

@Controller('faker')
export class FakerController {
  constructor(private readonly fakerService: FakerService) {}

  @Post('seed')
  async seed(
    @Query('postCount') postCount: number,
    @Query('categoryCount') categoryCount: number,
    @Query('sessionsCount') sessionsCount: number,
  ) {
    await this.fakerService.seedDatabase(
      postCount,
      categoryCount,
      sessionsCount,
    );
    return {
      message: `${postCount} posts and ${categoryCount} categories created`,
    };
  }
}

import { Controller, Post, Query } from '@nestjs/common';
import { FakerService } from './faker.service';

@Controller('faker')
export class FakerController {
  constructor(private readonly fakerService: FakerService) {}

  @Post('posts')
  async seed(@Query('count') count: number) {
    await this.fakerService.seedPosts(count);
    return { message: `${count} posts created` };
  }
}

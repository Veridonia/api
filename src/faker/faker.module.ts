import { Module } from '@nestjs/common';
import { PostsModule } from '../posts/posts.module';
import { FakerService } from './faker.service';
import { FakerController } from './faker.controller';

@Module({
  imports: [PostsModule],
  providers: [FakerService],
  controllers: [FakerController],
})
export class FakerModule {}

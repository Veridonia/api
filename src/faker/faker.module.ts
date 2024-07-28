import { Module } from '@nestjs/common';
import { PostsModule } from '../posts/posts.module';
import { FakerService } from './faker.service';
import { FakerController } from './faker.controller';
import { CategoriesModule } from '../categories/categories.module';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [PostsModule, CategoriesModule, SessionsModule],
  providers: [FakerService],
  controllers: [FakerController],
})
export class FakerModule {}

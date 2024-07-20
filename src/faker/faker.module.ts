import { Module } from '@nestjs/common';
import { PostsModule } from '../posts/posts.module';
import { FakerService } from './faker.service';
import { FakerController } from './faker.controller';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [PostsModule, CategoriesModule],
  providers: [FakerService],
  controllers: [FakerController],
})
export class FakerModule {}

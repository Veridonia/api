import { forwardRef, Module } from '@nestjs/common';
import { SelectedCategoriesService } from './selected-categories.service';
import { SelectedCategoriesController } from './selected-categories.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { SessionsModule } from 'src/sessions/sessions.module';
import { SelectedCategorySchema } from './schemas/selected-category.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SelectedCategory', schema: SelectedCategorySchema },
    ]),
    CategoriesModule,
    forwardRef(() => SessionsModule),
  ],
  providers: [SelectedCategoriesService],
  controllers: [SelectedCategoriesController],
  exports: [SelectedCategoriesService],
})
export class SelectedCategoriesModule {}

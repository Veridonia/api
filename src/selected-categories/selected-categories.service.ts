// src/selected-categories/selected-categories.service.ts
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { SelectedCategory } from './schemas/selected-category.schema';
import { SoftDeleteModel } from 'mongoose-delete';
import { CreateSelectedCategoryDto } from './dto/create-selected-category.dto';
import { SessionsService } from 'src/sessions/sessions.service';

@Injectable()
export class SelectedCategoriesService {
  constructor(
    @InjectModel('SelectedCategory')
    private readonly selectedCategoryModel: SoftDeleteModel<SelectedCategory>,
    private readonly categoriesService: CategoriesService,
    @Inject(forwardRef(() => SessionsService))
    private sessionsService: SessionsService,
  ) {}

  // Create a new selected category
  async createSelectedCategory(
    createDto: CreateSelectedCategoryDto,
  ): Promise<SelectedCategory> {
    const { categoryId, sessionId } = createDto;
    const category = await this.categoriesService.findOne(categoryId);

    if (!category) {
      throw new NotFoundException('Category Not Found');
    }

    const session = await this.sessionsService.findSession(sessionId);

    if (!session) {
      throw new NotFoundException('Session Not Found');
    }

    const dataToSave = {
      ...createDto,
      category,
      session,
    };

    const createdCategory = new this.selectedCategoryModel(dataToSave);
    return createdCategory.save();
  }

  // Find all selected categories
  async findAllSelectedCategories(): Promise<SelectedCategory[]> {
    return this.selectedCategoryModel.find().populate('category').exec();
  }

  // Find a selected category by ID
  async findSelectedCategoryBySessionId(
    sessionId: string,
  ): Promise<SelectedCategory[]> {
    const session = await this.sessionsService.findSession(sessionId);
    return this.selectedCategoryModel
      .find({ session })
      .populate({
        path: 'session',
        select: '-sessionId', // Exclude the sessionId field
      })
      .populate('category')
      .exec();
  }

  // Update a selected category by ID
  async updateSelectedCategory(
    id: string,
    updateDto: any,
  ): Promise<SelectedCategory> {
    return this.selectedCategoryModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
  }

  // Soft delete a selected category by ID
  async deleteSelectedCategory(id: string) {
    return this.selectedCategoryModel.delete({ _id: id });
  }

  // Restore a soft deleted category by ID
  async restoreSelectedCategory(id: string) {
    return this.selectedCategoryModel.restore({ _id: id });
  }

  // Other methods to handle business logic can be added here
}

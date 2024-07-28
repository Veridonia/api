// src/selected-categories/selected-categories.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { SelectedCategoriesService } from './selected-categories.service';
import { CreateSelectedCategoryDto } from './dto/create-selected-category.dto';
import { UpdateSelectedCategoryDto } from './dto/update-selected-category.dto';
import { SelectedCategory } from './schemas/selected-category.schema';

@Controller('selected-categories')
export class SelectedCategoriesController {
  constructor(
    private readonly selectedCategoriesService: SelectedCategoriesService,
  ) {}

  @Post()
  async createSelectedCategory(
    @Body() createDto: CreateSelectedCategoryDto,
  ): Promise<SelectedCategory> {
    return this.selectedCategoriesService.createSelectedCategory(createDto);
  }

  @Get(':sessionId')
  async findSelectedCategoryById(
    @Param('sessionId') sessionId: string,
  ): Promise<SelectedCategory[]> {
    return this.selectedCategoriesService.findSelectedCategoryBySessionId(sessionId);
  }

  @Put(':id')
  async updateSelectedCategory(
    @Param('id') id: string,
    @Body() updateDto: UpdateSelectedCategoryDto,
  ): Promise<SelectedCategory> {
    return this.selectedCategoriesService.updateSelectedCategory(id, updateDto);
  }

  @Delete(':id')
  async deleteSelectedCategory(@Param('id') id: string) {
    return this.selectedCategoriesService.deleteSelectedCategory(id);
  }

  @Patch(':id/restore')
  async restoreSelectedCategory(@Param('id') id: string) {
    return this.selectedCategoriesService.restoreSelectedCategory(id);
  }
}

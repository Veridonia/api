import { PartialType } from '@nestjs/mapped-types';
import { CreateSelectedCategoryDto } from './create-selected-category.dto';

export class UpdateSelectedCategoryDto extends PartialType(
  CreateSelectedCategoryDto,
) {}

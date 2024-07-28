import { IsNotEmpty, IsMongoId, IsUUID } from 'class-validator';

export class CreateSelectedCategoryDto {
  @IsUUID()
  @IsNotEmpty()
  sessionId: string;

  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;
}

import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsISO8601,
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsUUID()
  @IsNotEmpty()
  readonly sessionId: string;

  @IsObjectId()
  @IsNotEmpty()
  readonly categoryId: string;

  @IsISO8601()
  @IsOptional()
  readonly expiresAt?: string;
}

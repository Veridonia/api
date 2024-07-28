import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsISO8601,
  IsOptional,
} from 'class-validator';

export class UpdatePostDto {
  // @IsString()
  // @IsNotEmpty()
  // readonly title?: string;

  // @IsString()
  // @IsNotEmpty()
  // readonly content?: string;

  // @IsUUID()
  // @IsNotEmpty()
  // readonly sessionId?: string;

  // @IsUUID()
  // @IsNotEmpty()
  // readonly categoryId?: string;

  @IsISO8601()
  @IsOptional()
  readonly expiresAt?: string;
}

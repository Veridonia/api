import { IsString, Length } from 'class-validator';

export class ChangeUsernameDto {
  @IsString()
  @Length(3, 20)
  newUsername: string;
}

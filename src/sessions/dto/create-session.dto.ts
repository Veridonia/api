import { IsIP } from 'class-validator';

export class CreateSessionDto {
  @IsIP()
  ip: string;
}

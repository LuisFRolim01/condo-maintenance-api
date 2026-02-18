import { IsOptional, IsString, IsEnum, IsEmail } from 'class-validator';
import { AreaStatus } from '../area-status.enum';

export class UpdateAreaDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(AreaStatus)
  @IsOptional()
  status?: AreaStatus;

  @IsEmail()
  email?: string;
}

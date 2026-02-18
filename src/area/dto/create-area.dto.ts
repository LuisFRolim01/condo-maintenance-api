import { IsNotEmpty, IsString, IsOptional, IsEnum, IsEmail} from 'class-validator';
import { AreaStatus } from '../area-status.enum';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(AreaStatus)
  @IsOptional()
  status: AreaStatus;

  @IsEmail()
  email: string;

}

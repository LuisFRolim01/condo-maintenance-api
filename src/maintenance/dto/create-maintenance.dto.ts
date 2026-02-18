import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateMaintenanceDto {

  @IsNumber()
  areaId: number;

  @IsString()
  type: string;

  @IsDateString()
  lastMaintenanceDate: string;

  @IsNumber()
  frequencyDays: number;
}

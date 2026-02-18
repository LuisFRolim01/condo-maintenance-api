import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { Query } from '@nestjs/common';


@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  create(@Body() dto: CreateMaintenanceDto) {
    return this.maintenanceService.create(dto);
  }

  @Get()
  findAll() {
    return this.maintenanceService.findAll();
  }

  @Get('upcoming')
getUpcoming(@Query('days') days?: string) {
  return this.maintenanceService.getUpcoming(Number(days) || 7);
}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.maintenanceService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.maintenanceService.remove(id);
    return { message: 'Manutenção removida com sucesso' };
  }

}

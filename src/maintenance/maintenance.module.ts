import { Module } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { AreaModule } from '../area/area.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from './maintenance.entity';
import { EmailModule } from '../email/email.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Maintenance]),
    AreaModule,
    EmailModule
  ],
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
})
export class MaintenanceModule {}

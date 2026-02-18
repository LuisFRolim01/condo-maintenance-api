import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaModule } from './area/area.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from './email/email.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 🔥 só para desenvolvimento
    }),
    ScheduleModule.forRoot(),
    AreaModule,
    MaintenanceModule,
    EmailModule,

  ],
})
export class AppModule {}

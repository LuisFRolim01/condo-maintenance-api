import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService],
})
export class AreaModule {}

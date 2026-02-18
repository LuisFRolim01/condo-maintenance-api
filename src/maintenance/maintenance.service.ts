import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { Maintenance } from './maintenance.entity';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { AreaService } from '../area/area.service';
import { EmailService } from '../email/email.service';


@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(Maintenance)
    private maintenanceRepository: Repository<Maintenance>,
    private readonly areaService: AreaService,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateMaintenanceDto): Promise<Maintenance> {
    const area = await this.areaService.findOne(dto.areaId);

    const maintenance = this.maintenanceRepository.create({
      type: dto.type,
      lastMaintenanceDate: new Date(dto.lastMaintenanceDate),
      frequencyDays: dto.frequencyDays,
      area: area,
    });

    const saved = await this.maintenanceRepository.save(maintenance);

    // 🔥 TESTE DE ENVIO DE EMAIL
    await this.emailService.sendMaintenanceAlert(
      area.email,
      area.name,
      dto.type,
      new Date(dto.lastMaintenanceDate),
    );

    return saved;
  }

  async findAll(): Promise<Maintenance[]> {
    return this.maintenanceRepository.find({
      relations: ['area'],
    });
  }

  async findOne(id: number): Promise<Maintenance> {
    const maintenance = await this.maintenanceRepository.findOne({
      where: { id },
      relations: ['area'],
    });

    if (!maintenance) {
      throw new NotFoundException('Manutenção não encontrada');
    }

    return maintenance;
  }

  async remove(id: number): Promise<void> {
    const maintenance = await this.findOne(id);
    await this.maintenanceRepository.remove(maintenance);
  }

  async getUpcoming(days: number = 7) {
    const today = new Date();

    const maintenances = await this.maintenanceRepository.find({
      relations: ['area'],
    });

    return maintenances
      .map((maintenance) => {
        const nextDate = new Date(maintenance.lastMaintenanceDate);
        nextDate.setDate(
          nextDate.getDate() + maintenance.frequencyDays,
        );

        const diffTime = nextDate.getTime() - today.getTime();
        const diffDays = Math.ceil(
          diffTime / (1000 * 60 * 60 * 24),
        );

        let status = 'OK';

        if (diffDays < 0) {
          status = 'OVERDUE';
        } else if (diffDays <= days) {
          status = 'UPCOMING';
        }

        return {
          id: maintenance.id,
          area: {
            id: maintenance.area.id,
            name: maintenance.area.name,
            email: maintenance.area.email,
          },
          type: maintenance.type,
          nextMaintenanceDate: nextDate,
          daysRemaining: diffDays,
          status,
        };
      })
      .filter((m) => m.status !== 'OK')
      .sort((a, b) => a.daysRemaining - b.daysRemaining);
  }
}


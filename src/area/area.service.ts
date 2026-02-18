import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './area.entity';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
  ) {}

  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    const area = this.areaRepository.create(createAreaDto);
    return this.areaRepository.save(area);
  }

  async findAll(): Promise<Area[]> {
    return this.areaRepository.find({
      relations: ['maintenances'],
    });
  }

  async findOne(id: number): Promise<Area> {
    const area = await this.areaRepository.findOne({
      where: { id },
      relations: ['maintenances'],
    });

    if (!area) {
      throw new NotFoundException('Área não encontrada');
    }

    return area;
  }

  async update(id: number, dto: UpdateAreaDto): Promise<Area> {
    const area = await this.findOne(id);

    Object.assign(area, dto);

    return this.areaRepository.save(area);
  }

  async remove(id: number): Promise<void> {
    const area = await this.findOne(id);
    await this.areaRepository.remove(area);
  }
}

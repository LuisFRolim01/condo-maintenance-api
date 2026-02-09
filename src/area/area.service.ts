import { Injectable, NotFoundException } from '@nestjs/common';
import { Area } from './area.entity';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { AreaStatus } from './area-status.enum';


@Injectable()
export class AreaService {
  private areas: Area[] = [];
  private idCounter = 1;

  create(createAreaDto: CreateAreaDto): Area {
  const area: Area = {
    id: this.idCounter++,
    name: createAreaDto.name,
    description: createAreaDto.description,
    status: createAreaDto.status ?? AreaStatus.ATIVA,
  };

  this.areas.push(area);
  return area;
}

  findAll(): Area[] {
    return this.areas;
  }

  findOne(id: number): Area {
    const area = this.areas.find(a => a.id === id);
    if (!area) {
      throw new NotFoundException('Área não encontrada');
    }
    return area;
  }

  update(id: number, dto: UpdateAreaDto) {
  const area = this.findOne(id);

  if (dto.name !== undefined) {
    area.name = dto.name;
  }

  if (dto.description !== undefined) {
    area.description = dto.description;
  }

  if (dto.status !== undefined) {
    area.status = dto.status;
  }

  return area;
}


  

  remove(id: number): void {
    const index = this.areas.findIndex(a => a.id === id);
    if (index === -1) {
      throw new NotFoundException('Área não encontrada');
    }
    this.areas.splice(index, 1);
  }
}

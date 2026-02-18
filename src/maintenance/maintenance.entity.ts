import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Area } from '../area/area.entity';

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ type: 'datetime' })
  lastMaintenanceDate: Date;

  @Column()
  frequencyDays: number;


  @ManyToOne(() => Area, area => area.maintenances, { onDelete: 'CASCADE' })
  area: Area;
}

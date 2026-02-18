import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Maintenance } from '../maintenance/maintenance.entity';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  email: string;

  @OneToMany(() => Maintenance, maintenance => maintenance.area)
  maintenances: Maintenance[];
}

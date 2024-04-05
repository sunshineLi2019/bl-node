import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// @Index(['name'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AttentionEntity } from './attention.entity';

@Entity()
export class Dog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  recommendations: number;

  @Column()
  title: string;

  @Column()
  age: number;

  @JoinTable()
  @ManyToMany(() => AttentionEntity, (attention) => attention.dog, {
    cascade: true,
  })
  attention: AttentionEntity[];
}

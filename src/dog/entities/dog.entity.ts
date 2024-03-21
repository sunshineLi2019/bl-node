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

  @Column()
  name: string;

  @Column()
  age: number;

  @JoinTable()
  @ManyToMany((type) => AttentionEntity, (attention) => attention.dog, {
    cascade: true,
  })
  attention: AttentionEntity[];
}

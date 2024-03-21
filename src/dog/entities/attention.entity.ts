import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dog } from './dog.entity';

@Entity()
export class AttentionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Dog, (dog) => dog.attention)
  dog: Dog[];
}

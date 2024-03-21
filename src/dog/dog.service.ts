import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';
import { CreateDogDto } from './create-dog.dto';
import { AttentionEntity } from './entities/attention.entity';
import { log } from 'console';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRqpository: Repository<Dog>,
    @InjectRepository(AttentionEntity)
    private readonly attentRepository: Repository<AttentionEntity>,
  ) {}
  findAll() {
    return this.dogRqpository.find({ relations: ['attention'] });
  }
  async findOne(id: number) {
    const dog = await this.dogRqpository.findOneBy({ id });
    if (!dog) {
      throw new NotFoundException(`dog # ${id} not found`);
    }
    return dog;
  }
  async create(CreateDogDto: CreateDogDto) {
    const attention = await Promise.all(
      CreateDogDto.attention.map((name) => this.preloadAttentByName(name)),
    );
    const dog = this.dogRqpository.create({ ...CreateDogDto, attention });
    return this.dogRqpository.save(dog);
  }
  async remove(id: number) {
    const dog = await this.dogRqpository.findOneBy({ id });
    return this.dogRqpository.remove(dog);
  }
  private async preloadAttentByName(name: string): Promise<AttentionEntity> {
    const existingAttent = await this.attentRepository.findOneBy({ name });
    if (existingAttent) {
      return existingAttent;
    }

    return this.attentRepository.create({ name });
  }
}

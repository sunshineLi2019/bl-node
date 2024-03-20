import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './dog.entity';
import { Repository } from 'typeorm';
import { CreateDogDto } from './create-dog.dto';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(Dog) private readonly dogRqpository: Repository<Dog>,
  ) {}
  findAll() {
    return this.dogRqpository.find();
  }
  async findOne(id: number) {
    const dog = await this.dogRqpository.findOneBy({ id });
    if (!dog) {
      throw new NotFoundException(`dog # ${id} not found`);
    }
    return dog;
  }
  create(CreateDogDto: CreateDogDto) {
    const dog = this.dogRqpository.create(CreateDogDto);
    return this.dogRqpository.save(dog);
  }
  async remove(id: number) {
    const dog = await this.dogRqpository.findOneBy({ id });
    return this.dogRqpository.remove(dog);
  }
}

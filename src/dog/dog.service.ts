import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateDogDto } from './create-dog.dto';
import { AttentionEntity } from './entities/attention.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Event } from 'src/event/entities/event.entity/event.entity';
@Injectable()
export class DogService {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRqpository: Repository<Dog>,
    @InjectRepository(AttentionEntity)
    private readonly attentRepository: Repository<AttentionEntity>,
    // @InjectRepository(Event)
    // private readonly eventRepository: Repository<Event>,

    private readonly dataSource: DataSource,
  ) {}
  findAll(paginationQueryDto: PaginationQueryDto) {
    const { offser, limit } = paginationQueryDto;
    return this.dogRqpository.find({
      relations: ['attention'],
      skip: offser,
      take: limit,
    });
  }
  async findOne(id: number) {
    const dog = await this.dogRqpository.findOneBy({ id });
    if (!dog) {
      throw new NotFoundException(`dog # ${id} not found`);
    }
    return dog;
  }
  async create(CreateDogDto: CreateDogDto) {
    console.log(CreateDogDto);

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
  async recommentDog(dog: Dog) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // try {
    //   dog.recommendations++;
    //   const recommendEvent = new Event();
    //   recommendEvent.name = 'recommend_dog';
    //   recommendEvent.payload = { dogid: dog.id };
    //   await queryRunner.manager.save(dog);
    //   // await queryRunner.manager.save(recommendEvent);
    //   await queryRunner.commitTransaction();
    // } catch (err) {
    //   await queryRunner.rollbackTransaction();
    // } finally {
    //   await queryRunner.release();
    // }
  }
  private async preloadAttentByName(name: string): Promise<AttentionEntity> {
    const existingAttent = await this.attentRepository.findOneBy({ name });
    if (existingAttent) {
      return existingAttent;
    }

    return this.attentRepository.create({ name });
  }
}

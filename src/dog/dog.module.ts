import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { DogController } from './dog.controller';
import { DogService } from './dog.service';
import { AttentionEntity } from './entities/attention.entity';
import { Event } from '../event/entities/event.entity/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dog, AttentionEntity])],
  controllers: [DogController],
  providers: [DogService],
  exports: [DogService],
})
export class DogModule {}

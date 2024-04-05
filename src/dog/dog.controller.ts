import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DogService } from './dog.service';
import { CreateDogDto } from './create-dog.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Dog } from './entities/dog.entity';

@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}
  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.dogService.findAll(paginationQueryDto);
  }
  @Post()
  async create(@Body() createDogDto: CreateDogDto) {
    return this.dogService.create(createDogDto);
  }
  @Post('/recomment')
  async recommentDog(@Body() dog: Dog) {
    // this.dogService.recommentDog(dog);
  }
  @Delete()
  async remove(@Param('id') id: number) {
    const dog = await this.dogService.remove(id);
    return dog;
  }
}

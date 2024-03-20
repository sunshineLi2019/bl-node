import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { DogService } from './dog.service';
import { CreateDogDto } from './create-dog.dto';

@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}
  @Get()
  find(): any {
    return this.dogService.findAll();
  }

  @Post()
  async create(@Body() CreateDogDto: CreateDogDto) {
    return this.dogService.create(CreateDogDto);
  }
  @Delete()
  async remove(@Param('id') id: number) {
    const dog = await this.dogService.remove(id);
    return dog;
  }
}

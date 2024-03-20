import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Redirect,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { ValidationPipe } from 'src/dog/validate.pipe';
type a = {
  url: string;
  statusCode?: number;
};
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  // @HttpCode(202)
  // @Get(':id')
  @Get('/1')
  find1(): string {
    return 'This action returns all cat';
  }
  // 使用动态路由之后静态路由就会失效
  @Get('/2')
  @Redirect('http://localhost:3000/cats', 302)
  redirect(): a {
    return { url: 'http://localhost:3000/cats/1', statusCode: 302 };
  }
  // 新建DTO
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
    return 'This action adds a new cat';
  }
  @Get()
  async findAll(): Promise<CreateCatDto[]> {
    return this.catsService.findAll();
  }
}

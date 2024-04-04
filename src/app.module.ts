import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';
import { DogController } from './dog/dog.controller';
import { DogModule } from './dog/dog.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { CatsModule } from './cats/cats.moudle';
import { CatsController } from './cats/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProviders } from './database.providers';
@Module({
  imports: [
    DogModule,
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/src/migrations/*.js'],
      autoLoadEntities: true,
      // synchronize: true,
    }),
  ],
  controllers: [AppController, DogController, CatsController],
  providers: [
    AppService,
    CatsService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ...databaseProviders,
  ],
  exports: [...databaseProviders],
})
export class AppModule {}

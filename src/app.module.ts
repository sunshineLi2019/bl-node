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
import { ormConfig } from 'typeormConfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigAppModule } from './config/config.module';

@Module({
  imports: [
    DogModule,
    CatsModule,
    ConfigAppModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('host'),
          port: configService.get<number>('baseport'),
          username: configService.get<string>('username'),
          password: configService.get<string>('password'),
          database: configService.get<string>('database'),
          entities: ['dist/src/**/entities/*.entity{.js,.ts}'],
          synchronize: true, // 自动同步实体结构
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, DogController, CatsController],
  providers: [
    AppService,
    CatsService,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // ...databaseProviders,
  ],
  // exports: [...databaseProviders],
})
export class AppModule {}

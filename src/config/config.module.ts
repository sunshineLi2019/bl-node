// config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.production'],
      load: [configuration],
      isGlobal: true, // 将配置模块设为全局范围
    }),
  ],
})
export class ConfigAppModule {}

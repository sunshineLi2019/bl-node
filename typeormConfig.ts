import { DataSource, DataSourceOptions } from 'typeorm';

const baseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: +process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'pass123',
  database: process.env.DATABASE_DATABASE || 'postgres',
};

// 该对象用于 nestjs typeorm 初始化
export const ormConfig: DataSourceOptions = {
  ...baseConfig,
  entities: ['dist/src/**/entities/*.entity{.js,.ts}'],
};

// 该对象 typeorm cli 迁移时使用
const ormConfigForCli: DataSourceOptions = {
  ...baseConfig,
  entities: ['dist/src/**/entities/*.entity{.js,.ts}'],
  migrations: ['migrations/*{.js,.ts}'], // migration:run时查找的文件夹
};

// 实例化dataSource，用以之后cli使用
const dataSource = new DataSource(ormConfigForCli);

// 此处的dataSource需要 export default才可以使用
export default dataSource;

// config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.DATABASE_HOST || 'localhost',
  baseport: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'pass123',
  database: process.env.DATABASE_NAME || 'postgres',
  // 其他配置选项
});

import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DataSource,
    useFactory: async () => {
      // You can inject config service to provide dynamic DataSourceOptions
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'pass123',
        database: 'postgres',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // synchronize: true,
      });
      try {
        if (!dataSource.isInitialized) {
          await dataSource.initialize();
        }
      } catch (error) {
        console.error(error?.message);
      }
      return dataSource;
    },
  },
];

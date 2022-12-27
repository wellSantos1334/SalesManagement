import { DataSource, DataSourceOptions } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'mssql',
  host: 'localhost',
  port: 49565,
  username: 'sa',
  password: '1234',
  database: 'apivendas',
  entities: ['./src/modules/**/typeorm/entities/*.ts'],
  extra: {
    trustServerCertificate: true,
  },
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/typeorm/migrations',
  },
} as DataSourceOptions);

appDataSource.initialize();

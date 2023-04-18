import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '1206318',
  database: process.env.DB_NAME ?? 'management',
  port: Number(process.env.DB_PORT) ?? 5432,
  synchronize: true,
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
};

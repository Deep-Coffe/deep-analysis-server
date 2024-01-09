import dotenv from 'dotenv';

dotenv.config();

export const DbEnvConfig = {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "docker",
    database: process.env.DB_DATABASE ?? "local",
    synchronize: Boolean(process.env.SYNCHRONIZE ?? false),
    logging: Boolean(process.env.LOGGING ?? false),
}
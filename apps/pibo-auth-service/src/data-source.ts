import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Tenant } from './tenants/entities/tenant.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'pibo_erp',
    entities: [User, Tenant],
    migrations: ['src/migrations/*.ts'],
    synchronize: false, // Set to false in production, use migrations instead
    logging: process.env.NODE_ENV !== 'production',
});

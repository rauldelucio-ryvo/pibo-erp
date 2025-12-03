import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TenantsModule } from './tenants/tenants.module';
import { User } from './users/entities/user.entity';
import { Tenant } from './tenants/entities/tenant.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL || 'postgres://admin:password@localhost:5432/pibo_erp',
            entities: [User, Tenant],
            synchronize: true, // Auto-create tables (Dev only)
        }),
        AuthModule,
        UsersModule,
        TenantsModule,
    ],
})
export class AppModule { }

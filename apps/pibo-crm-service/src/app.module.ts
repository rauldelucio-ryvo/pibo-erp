import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmController } from './crm.controller';
import { CrmService } from './crm.service';
import { Lead, Opportunity } from './entities/crm.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL || 'postgres://admin:password@localhost:5432/pibo_erp',
            entities: [Lead, Opportunity],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Lead, Opportunity]),
    ],
    controllers: [CrmController],
    providers: [CrmService],
})
export class AppModule { }

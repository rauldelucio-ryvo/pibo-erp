import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiscalController } from './fiscal.controller';
import { FiscalService } from './fiscal.service';
import { NFe } from './entities/nfe.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL || 'postgres://admin:password@localhost:5432/pibo_erp',
            entities: [NFe],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([NFe]),
    ],
    controllers: [FiscalController],
    providers: [FiscalService],
})
export class AppModule { }

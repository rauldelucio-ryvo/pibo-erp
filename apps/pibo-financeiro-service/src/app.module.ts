import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceiroController } from './financeiro.controller';
import { FinanceiroService } from './financeiro.service';
import { ContaPagar, ContaReceber } from './entities/financeiro.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL || 'postgres://admin:password@localhost:5432/pibo_erp',
            entities: [ContaPagar, ContaReceber],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([ContaPagar, ContaReceber]),
    ],
    controllers: [FinanceiroController],
    providers: [FinanceiroService],
})
export class AppModule { }

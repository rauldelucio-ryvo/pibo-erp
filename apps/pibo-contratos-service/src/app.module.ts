import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ContratosService } from './contratos.service';
import { ContratoRecorrente } from './entities/contratos.entity';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('contratos')
export class ContratosController {
    constructor(private service: ContratosService) { }
    @Post()
    create(@Body() body) { return this.service.create(body); }
}

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL || 'postgres://admin:password@localhost:5432/pibo_erp',
            entities: [ContratoRecorrente],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([ContratoRecorrente]),
        ScheduleModule.forRoot(),
    ],
    controllers: [ContratosController],
    providers: [ContratosService],
})
export class AppModule { }

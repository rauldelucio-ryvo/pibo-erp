import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComprasController } from './compras.controller';
import { ComprasService } from './compras.service';
import { PedidoCompra } from './entities/compras.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL || 'postgres://admin:password@localhost:5432/pibo_erp',
            entities: [PedidoCompra],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([PedidoCompra]),
    ],
    controllers: [ComprasController],
    providers: [ComprasService],
})
export class AppModule { }

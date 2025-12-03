import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendasController } from './vendas.controller';
import { VendasService } from './vendas.service';
import { PedidoVenda, ItemPedido } from './entities/vendas.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL || 'postgres://admin:password@localhost:5432/pibo_erp',
            entities: [PedidoVenda, ItemPedido],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([PedidoVenda, ItemPedido]),
    ],
    controllers: [VendasController],
    providers: [VendasService],
})
export class AppModule { }

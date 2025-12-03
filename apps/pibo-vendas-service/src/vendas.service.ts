import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoVenda, ItemPedido } from './entities/vendas.entity';
import axios from 'axios';

@Injectable()
export class VendasService {
    constructor(
        @InjectRepository(PedidoVenda)
        private pedidoRepo: Repository<PedidoVenda>,
        @InjectRepository(ItemPedido)
        private itemRepo: Repository<ItemPedido>,
    ) { }

    async createOrder(data: any) {
        // 1. Validate Stock (Sync Call to Estoque Service)
        const estoqueServiceUrl = process.env.ESTOQUE_SERVICE_URL || 'http://localhost:3000/estoque';

        for (const item of data.items) {
            try {
                await axios.post(`${estoqueServiceUrl}/products/${item.productId}/reserve`, {
                    quantity: item.quantity,
                    reason: `Order Creation`,
                });
            } catch (error) {
                throw new BadRequestException(`Failed to reserve stock for product ${item.productId}`);
            }
        }

        // 2. Create Order with Commission
        const commissionRate = 0.05; // 5% Commission
        const pedido = this.pedidoRepo.create({
            customerId: data.customerId,
            totalValue: data.totalValue,
            commissionValue: data.totalValue * commissionRate,
            status: 'CONFIRMED',
        });
        const savedPedido = await this.pedidoRepo.save(pedido);

        // 3. Save Items
        for (const item of data.items) {
            const itemPedido = this.itemRepo.create({
                pedido: savedPedido,
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
            });
            await this.itemRepo.save(itemPedido);
        }

        return savedPedido;
    }
}

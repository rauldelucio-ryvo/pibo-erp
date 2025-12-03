import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoCompra } from './entities/compras.entity';

@Injectable()
export class ComprasService {
    constructor(
        @InjectRepository(PedidoCompra)
        private repo: Repository<PedidoCompra>,
    ) { }

    create(data: Partial<PedidoCompra>) {
        const pedido = this.repo.create(data);
        return this.repo.save(pedido);
    }

    findAll() {
        return this.repo.find();
    }
}

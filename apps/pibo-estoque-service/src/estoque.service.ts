import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Produto, MovimentacaoEstoque } from './entities/estoque.entity';

@Injectable()
export class EstoqueService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepo: Repository<Produto>,
        @InjectRepository(MovimentacaoEstoque)
        private movimentacaoRepo: Repository<MovimentacaoEstoque>,
        private dataSource: DataSource,
    ) { }

    async createProduct(data: Partial<Produto>) {
        const product = this.produtoRepo.create(data);
        return this.produtoRepo.save(product);
    }

    async findAllProducts() {
        return this.produtoRepo.find();
    }

    async reserveStock(productId: string, quantity: number, reason: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const product = await queryRunner.manager.findOne(Produto, {
                where: { id: productId },
                lock: { mode: 'pessimistic_write' },
            });

            if (!product) {
                throw new NotFoundException('Product not found');
            }

            if (product.stockQuantity < quantity) {
                throw new BadRequestException('Insufficient stock');
            }

            product.stockQuantity -= quantity;
            await queryRunner.manager.save(product);

            const movimentacao = new MovimentacaoEstoque();
            movimentacao.productId = productId;
            movimentacao.quantity = quantity;
            movimentacao.type = 'OUT';
            movimentacao.reason = reason;
            await queryRunner.manager.save(movimentacao);

            await queryRunner.commitTransaction();
            return product;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}

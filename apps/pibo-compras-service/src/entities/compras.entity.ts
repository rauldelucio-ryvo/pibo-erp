import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pedidos_compra')
export class PedidoCompra {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    supplierId: string;

    @Column('decimal')
    totalValue: number;

    @Column({ default: 'PENDING' })
    status: string;

    @Column('simple-json')
    items: { productId: string; quantity: number; unitCost: number }[];
}

import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('pedidos_venda')
export class PedidoVenda {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    customerId: string;

    @Column('decimal')
    totalValue: number;

    @Column('decimal', { nullable: true })
    commissionValue: number;

    @Column()
    status: string;

    @OneToMany(() => ItemPedido, item => item.pedido)
    itens: ItemPedido[];
}

@Entity('itens_pedido')
export class ItemPedido {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => PedidoVenda, pedido => pedido.itens)
    pedido: PedidoVenda;

    @Column()
    productId: string;

    @Column('int')
    quantity: number;

    @Column('decimal')
    unitPrice: number;
}

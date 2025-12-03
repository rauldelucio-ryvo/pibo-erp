import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produtos')
export class Produto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    sku: string;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    stockQuantity: number;
}

@Entity('movimentacoes_estoque')
export class MovimentacaoEstoque {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productId: string;

    @Column('int')
    quantity: number;

    @Column()
    type: 'IN' | 'OUT';

    @Column()
    reason: string;
}

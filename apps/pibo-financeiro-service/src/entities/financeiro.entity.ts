import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contas_pagar')
export class ContaPagar {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column('decimal')
    value: number;

    @Column()
    dueDate: Date;

    @Column({ default: false })
    isPaid: boolean;
}

@Entity('contas_receber')
export class ContaReceber {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column('decimal')
    value: number;

    @Column()
    dueDate: Date;

    @Column({ default: false })
    isReceived: boolean;
}

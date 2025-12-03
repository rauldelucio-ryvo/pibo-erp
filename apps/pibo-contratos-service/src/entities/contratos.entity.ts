import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contratos_recorrentes')
export class ContratoRecorrente {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    customerId: string;

    @Column('decimal')
    monthlyValue: number;

    @Column()
    nextBillingDate: Date;

    @Column()
    status: 'ACTIVE' | 'CANCELLED';
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('nfe')
export class NFe {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    externalId: string; // Link to Order ID

    @Column('decimal')
    value: number;

    @Column()
    status: string; // PROCESSING, AUTHORIZED, REJECTED

    @Column({ nullable: true })
    accessKey: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

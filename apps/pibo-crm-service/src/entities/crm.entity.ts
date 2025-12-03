import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum PipelineStage {
    NEW = 'new',
    QUALIFIED = 'qualified',
    PROPOSAL = 'proposal',
    WON = 'won',
    LOST = 'lost',
}

@Entity('leads')
export class Lead {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    company: string;
}

@Entity('opportunities')
export class Opportunity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('decimal')
    value: number;

    @Column({
        type: 'enum',
        enum: PipelineStage,
        default: PipelineStage.NEW,
    })
    stage: PipelineStage;

    @ManyToOne(() => Lead)
    lead: Lead;
}

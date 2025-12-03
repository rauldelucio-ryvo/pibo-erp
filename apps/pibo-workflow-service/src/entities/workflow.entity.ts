import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workflow_definitions')
export class WorkflowDefinition {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('jsonb')
    rules: any; // Store rules as JSON, e.g., { "condition": "value > 1000", "action": "approve" }
}

@Entity('approval_tasks')
export class ApprovalTask {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    workflowId: string;

    @Column()
    targetEntityId: string; // ID of the entity being approved (e.g., PedidoVenda ID)

    @Column()
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

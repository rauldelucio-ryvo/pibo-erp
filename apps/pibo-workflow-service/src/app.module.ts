import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';
import { WorkflowDefinition, ApprovalTask } from './entities/workflow.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL || 'postgres://admin:password@localhost:5432/pibo_erp',
            entities: [WorkflowDefinition, ApprovalTask],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([WorkflowDefinition, ApprovalTask]),
    ],
    controllers: [WorkflowController],
    providers: [WorkflowService],
})
export class AppModule { }

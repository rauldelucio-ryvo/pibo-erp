import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowDefinition, ApprovalTask } from './entities/workflow.entity';

@Injectable()
export class WorkflowService {
    constructor(
        @InjectRepository(WorkflowDefinition)
        private workflowRepo: Repository<WorkflowDefinition>,
        @InjectRepository(ApprovalTask)
        private taskRepo: Repository<ApprovalTask>,
    ) { }

    async createDefinition(data: Partial<WorkflowDefinition>) {
        const wf = this.workflowRepo.create(data);
        return this.workflowRepo.save(wf);
    }

    async evaluateRule(workflowId: string, context: any) {
        const wf = await this.workflowRepo.findOne({ where: { id: workflowId } });
        if (!wf) throw new Error('Workflow not found');

        const rules = wf.rules; // e.g. { "field": "amount", "operator": ">", "value": 1000, "action": "REQUIRE_APPROVAL" }

        let result = 'AUTO_APPROVE';

        // Simple Rule Evaluator
        if (rules.operator === '>') {
            if (context[rules.field] > rules.value) {
                result = rules.action;
            }
        } else if (rules.operator === '<') {
            if (context[rules.field] < rules.value) {
                result = rules.action;
            }
        }

        if (result === 'REQUIRE_APPROVAL') {
            const task = this.taskRepo.create({
                workflowId: wf.id,
                targetEntityId: context.id,
                status: 'PENDING',
            });
            await this.taskRepo.save(task);
        }

        return { result };
    }
}

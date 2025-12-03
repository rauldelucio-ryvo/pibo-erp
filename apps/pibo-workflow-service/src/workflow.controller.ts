import { Controller, Post, Body } from '@nestjs/common';
import { WorkflowService } from './workflow.service';

@Controller('workflow')
export class WorkflowController {
    constructor(private readonly workflowService: WorkflowService) { }

    @Post('definitions')
    createDef(@Body() body) {
        return this.workflowService.createDefinition(body);
    }

    @Post('evaluate')
    evaluate(@Body() body: { workflowId: string, context: any }) {
        return this.workflowService.evaluateRule(body.workflowId, body.context);
    }
}

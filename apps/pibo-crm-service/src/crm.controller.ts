import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { CrmService } from './crm.service';
import { PipelineStage } from './entities/crm.entity';

@Controller('crm')
export class CrmController {
    constructor(private readonly crmService: CrmService) { }

    // Leads
    @Post('leads')
    createLead(@Body() body) {
        return this.crmService.createLead(body);
    }

    @Get('leads')
    findAllLeads() {
        return this.crmService.findAllLeads();
    }

    // Opportunities
    @Post('opportunities')
    create(@Body() body) {
        return this.crmService.createOpportunity(body);
    }

    @Get('opportunities')
    findAll() {
        return this.crmService.findAll();
    }

    @Patch('opportunities/:id/stage')
    changeStage(@Param('id') id: string, @Body('stage') stage: PipelineStage) {
        return this.crmService.changeStage(id, stage);
    }
}

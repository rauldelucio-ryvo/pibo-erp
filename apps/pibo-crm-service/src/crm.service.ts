import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opportunity, PipelineStage, Lead } from './entities/crm.entity';

@Injectable()
export class CrmService {
    constructor(
        @InjectRepository(Opportunity)
        private opportunityRepo: Repository<Opportunity>,
        @InjectRepository(Lead)
        private leadRepo: Repository<Lead>,
    ) { }

    // Lead Methods
    async createLead(data: Partial<Lead>) {
        const lead = this.leadRepo.create(data);
        return this.leadRepo.save(lead);
    }

    async findAllLeads() {
        return this.leadRepo.find();
    }

    // Opportunity Methods
    private allowedTransitions = {
        [PipelineStage.NEW]: [PipelineStage.QUALIFIED, PipelineStage.LOST],
        [PipelineStage.QUALIFIED]: [PipelineStage.PROPOSAL, PipelineStage.LOST],
        [PipelineStage.PROPOSAL]: [PipelineStage.WON, PipelineStage.LOST],
        [PipelineStage.WON]: [],
        [PipelineStage.LOST]: [],
    };

    async createOpportunity(data: Partial<Opportunity>) {
        const opp = this.opportunityRepo.create({ ...data, stage: PipelineStage.NEW });
        return this.opportunityRepo.save(opp);
    }

    async changeStage(id: string, newStage: PipelineStage) {
        const opp = await this.opportunityRepo.findOne({ where: { id } });
        if (!opp) throw new NotFoundException('Opportunity not found');

        const allowed = this.allowedTransitions[opp.stage];
        if (!allowed.includes(newStage)) {
            throw new BadRequestException(`Cannot transition from ${opp.stage} to ${newStage}`);
        }

        opp.stage = newStage;
        return this.opportunityRepo.save(opp);
    }

    async findAll() {
        return this.opportunityRepo.find();
    }
}

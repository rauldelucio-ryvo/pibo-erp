import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ContratoRecorrente } from './entities/contratos.entity';

@Injectable()
export class ContratosService {
    private readonly logger = new Logger(ContratosService.name);

    constructor(
        @InjectRepository(ContratoRecorrente)
        private contratoRepo: Repository<ContratoRecorrente>,
    ) { }

    async create(data: Partial<ContratoRecorrente>) {
        return this.contratoRepo.save(this.contratoRepo.create(data));
    }

    @Cron(CronExpression.EVERY_10_SECONDS) // Running frequently for demo purposes (usually EVERY_DAY_AT_MIDNIGHT)
    async handleRecurringBilling() {
        this.logger.debug('Checking for recurring contracts to bill...');

        const activeContracts = await this.contratoRepo.find({ where: { status: 'ACTIVE' } });

        for (const contrato of activeContracts) {
            // Logic: Check if nextBillingDate <= now
            if (new Date(contrato.nextBillingDate) <= new Date()) {
                this.logger.log(`Billing Contract ${contrato.id} for Value ${contrato.monthlyValue}`);

                // In a real app, we would emit an event to Financeiro Service here
                // this.client.emit('generate_invoice', { ... });

                // Update next billing date
                const nextDate = new Date(contrato.nextBillingDate);
                nextDate.setMonth(nextDate.getMonth() + 1);
                contrato.nextBillingDate = nextDate;
                await this.contratoRepo.save(contrato);
            }
        }
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NFe } from './entities/nfe.entity';

@Injectable()
export class FiscalService {
    constructor(
        @InjectRepository(NFe)
        private nfeRepo: Repository<NFe>,
    ) { }

    async processEmission(data: any) {
        // 1. Find or Create NFe (Idempotency)
        let nfe = await this.nfeRepo.findOne({ where: { externalId: data.orderId } });
        if (!nfe) {
            nfe = this.nfeRepo.create({
                externalId: data.orderId,
                status: 'PROCESSING',
                value: data.value,
            });
            await this.nfeRepo.save(nfe);
        }

        console.log(`[Fiscal] Processing NFe for Order ${data.orderId}...`);

        // 2. Simulate SEFAZ Delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        // 3. Update Status
        nfe.status = 'AUTHORIZED';
        nfe.accessKey = '35231200000000000000550010000000011000000000'; // Mock Key
        await this.nfeRepo.save(nfe);

        console.log(`[Fiscal] NFe Authorized: ${nfe.accessKey}`);
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContaPagar, ContaReceber } from './entities/financeiro.entity';

@Injectable()
export class FinanceiroService {
    constructor(
        @InjectRepository(ContaPagar)
        private contaPagarRepo: Repository<ContaPagar>,
        @InjectRepository(ContaReceber)
        private contaReceberRepo: Repository<ContaReceber>,
    ) { }

    async createContaReceber(data: Partial<ContaReceber>) {
        const conta = this.contaReceberRepo.create(data);
        return this.contaReceberRepo.save(conta);
    }

    async processCnab(fileContent: string) {
        // Simulate CNAB parsing: Line format "ID|VALUE|DATE"
        const lines = fileContent.split('\n');
        const results = [];

        for (const line of lines) {
            if (!line.trim()) continue;
            const [id, value] = line.split('|');

            try {
                const conta = await this.contaReceberRepo.findOne({ where: { id } });
                if (conta) {
                    conta.isReceived = true;
                    await this.contaReceberRepo.save(conta);
                    results.push({ id, status: 'PAID' });
                } else {
                    results.push({ id, status: 'NOT_FOUND' });
                }
            } catch (e) {
                results.push({ id, status: 'ERROR' });
            }
        }
        return results;
    }

    async findAllReceber() {
        return this.contaReceberRepo.find();
    }
}

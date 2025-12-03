import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParametroFiscal } from './entities/config.entity';

@Injectable()
export class ConfigService {
    constructor(
        @InjectRepository(ParametroFiscal)
        private repo: Repository<ParametroFiscal>,
    ) { }

    create(data: Partial<ParametroFiscal>) {
        return this.repo.save(this.repo.create(data));
    }

    findAll() {
        return this.repo.find();
    }

    findOne(id: string) {
        return this.repo.findOne({ where: { id } });
    }

    async update(id: string, data: Partial<ParametroFiscal>) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
}

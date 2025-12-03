import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantsService {
    constructor(
        @InjectRepository(Tenant)
        private tenantsRepository: Repository<Tenant>,
    ) { }

    create(tenant: Partial<Tenant>): Promise<Tenant> {
        const newTenant = this.tenantsRepository.create(tenant);
        return this.tenantsRepository.save(newTenant);
    }
}

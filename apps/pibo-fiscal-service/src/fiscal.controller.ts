import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { FiscalService } from './fiscal.service';

@Controller()
export class FiscalController {
    constructor(private readonly fiscalService: FiscalService) { }

    @EventPattern('emit_nfe')
    async handleNfeEmission(@Payload() data: any) {
        await this.fiscalService.processEmission(data);
    }
}

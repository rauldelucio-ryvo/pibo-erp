import { Controller, Post, Body } from '@nestjs/common';
import { VendasService } from './vendas.service';

@Controller('vendas')
export class VendasController {
    constructor(private readonly vendasService: VendasService) { }

    @Post('orders')
    async createOrder(@Body() body) {
        return this.vendasService.createOrder(body);
    }
}

import { Controller, Post, Body, Get } from '@nestjs/common';
import { ComprasService } from './compras.service';

@Controller('compras')
export class ComprasController {
    constructor(private readonly service: ComprasService) { }

    @Post('orders')
    create(@Body() body) {
        return this.service.create(body);
    }

    @Get('orders')
    findAll() {
        return this.service.findAll();
    }
}

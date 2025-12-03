import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { EstoqueService } from './estoque.service';

@Controller('estoque')
export class EstoqueController {
    constructor(private readonly estoqueService: EstoqueService) { }

    @Post('products')
    createProduct(@Body() body) {
        return this.estoqueService.createProduct(body);
    }

    @Get('products')
    findAllProducts() {
        return this.estoqueService.findAllProducts();
    }

    @Post('products/:id/reserve')
    async reserve(@Param('id') id: string, @Body() body: { quantity: number; reason: string }) {
        return this.estoqueService.reserveStock(id, body.quantity, body.reason);
    }
}

import { Controller, Post, Body, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';

@Controller('financeiro')
export class FinanceiroController {
    constructor(private readonly financeiroService: FinanceiroService) { }

    @Post('contas-receber')
    create(@Body() body) {
        return this.financeiroService.createContaReceber(body);
    }

    @Get('contas-receber')
    findAll() {
        return this.financeiroService.findAllReceber();
    }

    @Post('cnab/process')
    async processCnab(@Body('content') content: string) {
        // In a real app, this would handle file upload. 
        // For simplicity, we accept the raw string content in the body.
        return this.financeiroService.processCnab(content);
    }
}

import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
    constructor(private readonly service: ConfigService) { }

    @Post()
    create(@Body() body) { return this.service.create(body); }

    @Get()
    findAll() { return this.service.findAll(); }

    @Get(':id')
    findOne(@Param('id') id: string) { return this.service.findOne(id); }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) { return this.service.update(id, body); }
}

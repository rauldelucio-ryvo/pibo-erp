import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';
import { ParametroFiscal } from './entities/config.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL || 'postgres://admin:password@localhost:5432/pibo_erp',
            entities: [ParametroFiscal],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([ParametroFiscal]),
    ],
    controllers: [ConfigController],
    providers: [ConfigService],
})
export class AppModule { }

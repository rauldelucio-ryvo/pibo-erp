import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueController } from './estoque.controller';
import { EstoqueService } from './estoque.service';
import { Produto, MovimentacaoEstoque } from './entities/estoque.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL || 'postgres://admin:password@localhost:5432/pibo_erp',
            entities: [Produto, MovimentacaoEstoque],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Produto, MovimentacaoEstoque]),
    ],
    controllers: [EstoqueController],
    providers: [EstoqueService],
})
export class AppModule { }

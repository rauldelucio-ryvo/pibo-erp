import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parametros_fiscais')
export class ParametroFiscal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tenantId: string;

    @Column()
    cnpj: string;

    @Column()
    certificadoDigitalPath: string;

    @Column()
    ambiente: 'HOMOLOGACAO' | 'PRODUCAO';
}

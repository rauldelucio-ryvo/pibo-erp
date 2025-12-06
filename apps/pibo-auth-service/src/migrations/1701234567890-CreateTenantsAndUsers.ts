import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateTenantsAndUsers1701234567890 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create tenants table
        await queryRunner.createTable(
            new Table({
                name: 'tenant',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true,
        );

        // Create users table
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'tenantId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'role',
                        type: 'varchar',
                        length: '50',
                        default: "'user'",
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['tenantId'],
                        referencedTableName: 'tenant',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                    },
                ],
            }),
            true,
        );

        // Create indexes
        await queryRunner.createIndex(
            'user',
            new TableIndex({
                name: 'IDX_USER_EMAIL',
                columnNames: ['email'],
            }),
        );

        await queryRunner.createIndex(
            'user',
            new TableIndex({
                name: 'IDX_USER_TENANT',
                columnNames: ['tenantId'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.dropIndex('user', 'IDX_USER_TENANT');
        await queryRunner.dropIndex('user', 'IDX_USER_EMAIL');

        // Drop tables
        await queryRunner.dropTable('user');
        await queryRunner.dropTable('tenant');
    }
}

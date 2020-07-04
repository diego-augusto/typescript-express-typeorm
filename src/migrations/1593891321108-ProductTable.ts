import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class ProductTable1587257126854 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable(new Table({
            name: 'store',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false
                },
                {
                    name: 'publicId',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'time with time zone',
                    isNullable: false,
                },
                {
                    name: 'updatedAt',
                    type: 'time with time zone'
                },
                {
                    name: 'deletedAt',
                    type: 'time with time zone',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'quatity',
                    type: 'int',
                    isNullable: false
                }
            ],
            foreignKeys: [
                {
                    name: 'FK_user',
                    columnNames: ['userId'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['id']
                },
                {
                    name: 'FK_store',
                    columnNames: ['storeId'],
                    referencedTableName: 'store',
                    referencedColumnNames: ['id']
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('product')

    }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class StoreTable1587255825703 implements MigrationInterface {

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
                }
            ],
            foreignKeys: [
                {
                    name: 'FK_user',
                    columnNames: ['userId'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['id']
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('store')
    }
}

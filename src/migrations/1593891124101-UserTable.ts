import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class UserTable1587245312325 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable(new Table({
            name: 'user',
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
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false
                }
            ]
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user')
    }
}

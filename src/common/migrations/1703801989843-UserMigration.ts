import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class UserMigration1703801989843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isUnique: true,
                    isPrimary: true
                },
                {
                    name: 'userId',
                    type: 'uuid',
                    isUnique: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    isNullable: true,
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}

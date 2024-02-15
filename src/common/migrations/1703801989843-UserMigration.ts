import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class UserMigration1703801989843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
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
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}

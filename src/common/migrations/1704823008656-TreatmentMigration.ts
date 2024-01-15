import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class TreatmentMigration1704823008656 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'treatment',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isUnique: true,
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'plagueId',
                    type: 'uuid'
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
            ],
            foreignKeys: [
                {
                    name: 'treatment_plague',
                    referencedTableName: 'plague',
                    referencedColumnNames: ['id'],
                    columnNames: ['plagueId'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('treatment');
    }

}

import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class TreatmentConsumableMigration1704823702138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'treatment_consumable',
            columns: [
                {
                    name: 'consumableId',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'treatmentId',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'quantity',
                    type: 'integer'
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
                    name: 'FK_CONS_TREAT',
                    columnNames: ['consumableId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'consumable'
                },
                {
                    name: 'FK_TREAT_CONS',
                    columnNames: ['treatmentId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'treatment',
                }
            ],
            uniques: [
                {
                    name: 'UK_CONS_TREATMENT',
                    columnNames: ['treatmentId', 'consumableId'],
                },
            ]
        }));


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('treatment_consumable')
    }

}

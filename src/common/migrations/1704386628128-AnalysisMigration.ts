import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class AnalysisMigration1704386628128 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'analysis',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isUnique: true,
                    isPrimary: true
                },
                {
                    name: 'plagueId',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'author',
                    type: 'varchar',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'cerscospora',
                    type: 'float',
                },
                {
                    name: 'leafRust',
                    type: 'float',
                },
                {
                    name: 'healthy',
                    type: 'float',
                },
                {
                    name: 'miner',
                    type: 'float',
                },
                {
                    name: 'phoma',
                    type: 'float',
                },
                {
                    name: 'analyzedAt',
                    type: 'timestamp'
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
                    name: "analysisPlague",
                    referencedTableName: "plague",
                    referencedColumnNames: ["id"],
                    columnNames: ["plagueId"],
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('analysis');
    }

}

import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AlterAnalysisAddAttachment1708021223011 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('analysis', new TableColumn({
            name: 'attachmentId',
            type: 'uuid',
        }));

        await queryRunner.createForeignKey('analysis', new TableForeignKey({
            name: 'analysisAttachment',
            referencedTableName: 'attachment',
            referencedColumnNames: ['id'],
            columnNames: ['attachmentId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('analysis', 'analysisAttachment');
        await queryRunner.dropTable('analysis');
    }

}

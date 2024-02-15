import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class AttachmentMigration1708018509082 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'attachment',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'fileName',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'data',
                    type: 'bytea'
                },
                {
                    name: 'mimeType',
                    type: 'varchar'
                },
                {
                    name: 'createdAt',
                    type: 'timestamp'
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('attachment');
    }

}

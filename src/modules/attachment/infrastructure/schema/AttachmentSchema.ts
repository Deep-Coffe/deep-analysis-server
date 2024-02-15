import { EntitySchemaType } from "@application/schema/EntitySchemaType";
import IAttachment from "@modules/attachment/domain/entity/IAttachment";
import { EntitySchema } from "typeorm";

export type AttachmentSchemaType = EntitySchemaType<IAttachment> & {
    createdAt: Date;
}

const attachmentSchema = new EntitySchema<AttachmentSchemaType>({
    name: 'attachment',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
        },
        fileName: {
            type: 'varchar',
            unique: true,
        },
        data: {
            type: 'bytea',
        },
        mimeType: {
            type: 'varchar'
        },
        createdAt: {
            type: 'timestamp'
        }
    }
});

export default attachmentSchema;
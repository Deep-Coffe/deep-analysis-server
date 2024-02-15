import Attachment from "@modules/attachment/domain/entity/Attachment";
import { AttachmentSchemaType } from "../schema/AttachmentSchema";

export default interface IAttachmentRepository {
    save(attachment: AttachmentSchemaType): Promise<void>;
    findByFileName(fileName: string): Promise<AttachmentSchemaType | null>;
}
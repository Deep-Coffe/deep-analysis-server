import Attachment from "../domain/entity/Attachment";
import { AttachmentSchemaType } from "../infrastructure/schema/AttachmentSchema";

class AttachmentMapper {
    static toPersist(attachment: Attachment): AttachmentSchemaType {
        return {
            id: attachment.id.toString(),
            ...attachment.props,
            createdAt: attachment.createdAt,
        }
    }
}

export default AttachmentMapper
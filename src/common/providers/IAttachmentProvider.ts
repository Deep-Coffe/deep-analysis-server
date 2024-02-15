import Attachment from "@modules/attachment/domain/entity/Attachment";

export default interface IAttachmentProvider {
    save(data: string): Promise<Attachment>;
    remove(fileName: string): Promise<void>;
}
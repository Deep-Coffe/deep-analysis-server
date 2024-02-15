import Attachment from "@modules/attachment/domain/entity/Attachment";
import IAttachmentProvider from "./IAttachmentProvider";
import updateConfig from "@config/UpdateConfig";


class LocalAttachmentProvider implements IAttachmentProvider {
    private readonly filenames: string[] = []

    constructor() { }

    public async save(data: string): Promise<Attachment> {
        const mimeType = '.jpg'
        const filename = updateConfig.storage.filename() + mimeType;

        return Attachment.createAttachment({
            fileName: filename,
            data,
            mimeType,
        });
    }

    public async remove(fileName: string): Promise<void> {
        return await Promise.resolve();
    }
}

export default LocalAttachmentProvider;
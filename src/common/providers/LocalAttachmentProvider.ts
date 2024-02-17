import Attachment from "@modules/attachment/domain/entity/Attachment";
import IAttachmentProvider from "./IAttachmentProvider";
import updateConfig from "@config/UpdateConfig";
import fs from 'fs'

class LocalAttachmentProvider implements IAttachmentProvider {
    private readonly filenames: string[] = []

    constructor() { }

    public async save(data: string): Promise<Attachment> {
        const mimeType = '.jpg'
        const filename = updateConfig.storage.filename() + mimeType;
        await fs.promises.writeFile(`${updateConfig.storage.directory}/${filename}`, data, 'base64');
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
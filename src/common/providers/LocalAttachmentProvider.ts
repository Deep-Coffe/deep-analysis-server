import Attachment from "@modules/attachment/domain/entity/Attachment";
import IAttachmentProvider from "./IAttachmentProvider";
import updateConfig from "@config/UpdateConfig";
import fs from 'fs'
import path from 'path'

class LocalAttachmentProvider implements IAttachmentProvider {
    private readonly filenames: string[] = []

    constructor() { }

    public async save(data: string): Promise<Attachment> {
        const mimeType = '.jpg'
        const filename = updateConfig.storage.filename() + mimeType;
        await fs.promises.writeFile(`temp/${filename}`, data, 'base64');
        return Attachment.createAttachment({
            fileName: filename,
            data,
            mimeType,
        });
    }

    public async remove(fileName: string): Promise<void> {
        const filePath = path.join('temp', fileName);
        const fileExits = await fs.promises.stat(filePath);
        if (fileExits) {
            await fs.promises.unlink(filePath);
        }
    }
}

export default LocalAttachmentProvider;

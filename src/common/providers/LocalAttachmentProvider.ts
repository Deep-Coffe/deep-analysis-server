import IAttachmentProvider from "./IAttachmentProvider";
import updateConfig from "@config/UpdateConfig";
import fs from 'fs'
import path from 'path'

class LocalAttachmentProvider implements IAttachmentProvider {
    private readonly filenames: string[] = []

    constructor() { }

    public async save(data: string): Promise<string> {
        const mimeType = '.jpg'
        const filename = updateConfig.storage.filename() + mimeType;
        await fs.promises.writeFile(`temp/${filename}`, data, 'base64');
        return filename;
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

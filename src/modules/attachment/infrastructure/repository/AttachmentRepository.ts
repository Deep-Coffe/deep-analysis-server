import RepositoryFactory from "@application/repository/RepositoryFactory";
import attachmentSchema, { AttachmentSchemaType } from "../schema/AttachmentSchema";
import IAttachmentRepository from "./IAttachmentRepository";
import { Repository } from "typeorm";

@RepositoryFactory.register(attachmentSchema)
class AttachmentRepository implements IAttachmentRepository {
    constructor(private readonly _ormRepository: Repository<AttachmentSchemaType>) { }

    public async save(attachment: AttachmentSchemaType): Promise<void> {
        await this._ormRepository.insert(attachment);
    }

    public async findByFileName(fileName: string): Promise<AttachmentSchemaType | null> {
        const [data] = await this._ormRepository.query(`
            SELECT 
                encode(data, 'base64') AS data,
                id,
                "fileName" ,
                "mimeType" ,
                "createdAt"
            FROM attachment WHERE "fileName" = '${fileName}'
        `,);

        return data
    }
}

export default AttachmentRepository;
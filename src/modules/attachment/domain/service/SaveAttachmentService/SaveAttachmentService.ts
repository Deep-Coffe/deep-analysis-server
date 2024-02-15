import IAttachmentRepository from "@modules/attachment/infrastructure/repository/IAttachmentRepository";
import { inject, injectable } from "tsyringe";
import Attachment from "../../entity/Attachment";
import AttachmentMapper from "@modules/attachment/common/AttachmentMapper";

@injectable()
class SaveAttachmentService {
    constructor(@inject('AttachmentRepository') private readonly _attachmentRepository: IAttachmentRepository) { }

    public async execute(attachment: Attachment) {
        await this._attachmentRepository.save(AttachmentMapper.toPersist(attachment));
    }
}

export default SaveAttachmentService;
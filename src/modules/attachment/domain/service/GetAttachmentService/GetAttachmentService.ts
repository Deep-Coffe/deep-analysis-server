import BadRequestError from "@application/error/BadRequestError";
import IAttachmentRepository from "@modules/attachment/infrastructure/repository/IAttachmentRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class GetAttachmentService {
    constructor(@inject('AttachmentRepository') private readonly _attachmentRepository: IAttachmentRepository) { }

    public async execute(fileName: string) {
        const attachment = await this._attachmentRepository.findByFileName(fileName);

        if (!attachment) throw new BadRequestError('Arquivo não encontrado');

        return attachment;
    }
}

export default GetAttachmentService;
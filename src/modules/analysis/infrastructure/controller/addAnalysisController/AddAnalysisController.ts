import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import { inject, injectable } from "tsyringe";
import { AddAnalysisControllerInputDTO } from "./AddAnalysisControllerDTO";
import AddAnalysisService from "@modules/analysis/domain/service/addAnalysisService/AddAnalysisService";
import ClassifyImageService from "@modules/analysis/domain/service/classificateImageService/ClassifyImageService";
import SaveAttachmentService from "@modules/attachment/domain/service/SaveAttachmentService/SaveAttachmentService";
import IAttachmentProvider from "@common/providers/IAttachmentProvider";

@injectable()
class AddAnalysisController implements IController {
    constructor(@inject('AttachmentProvider') private readonly _attachmentProvider: IAttachmentProvider,
        private readonly _addAnalysisService: AddAnalysisService,
        private readonly _classifyImageService: ClassifyImageService,
        private readonly _saveAttachmentService: SaveAttachmentService) { }

    public async handle({ payload, user }: ControllerInput<AddAnalysisControllerInputDTO>) {
        const classifications = await this._classifyImageService.execute({ image: payload.image });
        const attachment = await this._attachmentProvider.save(payload.image);
        await this._saveAttachmentService.execute(attachment);

        const result = await this._addAnalysisService.execute({
            userId: user.id,
            author: payload.author,
            analyzedAt: payload.analyzedAt,
            attachmentId: attachment.id.toString(),
            ...classifications,
        });

        return result;
    }
}

export default AddAnalysisController;
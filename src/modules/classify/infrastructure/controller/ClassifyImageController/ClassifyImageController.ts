import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import IAttachmentProvider from "@common/providers/IAttachmentProvider";
import ClassifyImageService from "@modules/classify/domain/service/classifyImageService/ClassifyImageService";
import { ClassifyImageOutputDTO } from "@modules/classify/domain/service/classifyImageService/ClassifyImageServiceDTO";
import { inject, injectable } from "tsyringe";

@injectable()
class ClassifyImageController implements IController {
    constructor(@inject('AttachmentProvider') private readonly _attachmentProvider: IAttachmentProvider,
        private readonly _classifyService: ClassifyImageService) { }

    public async handle({ payload }: ControllerInput<{ image: string }>): Promise<ClassifyImageOutputDTO> {
        const filename = await this._attachmentProvider.save(payload.image);
        const result = await this._classifyService.execute(filename);
        await this._attachmentProvider.remove(filename);

        return result
    }
}

export default ClassifyImageController;
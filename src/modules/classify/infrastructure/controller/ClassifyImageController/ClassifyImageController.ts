import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import IAttachmentProvider from "@common/providers/IAttachmentProvider";
import { ClassifyImageOutputDTO } from "@modules/classify/domain/service/classifyImageService/ClassifyImageServiceDTO";
import { inject, injectable } from "tsyringe";
import IClassifyModel from "../../model/classifyModel/IClassifyModel";

@injectable()
class ClassifyImageController implements IController {
    constructor(@inject('AttachmentProvider') private readonly _attachmentProvider: IAttachmentProvider,
        @inject('ClassifyModel') private readonly _classifyModel: IClassifyModel) { }

    public async handle({ payload }: ControllerInput<{ image: string }>): Promise<ClassifyImageOutputDTO> {
        const filename = await this._attachmentProvider.save(payload.image);

        const result = await this._classifyModel.run(filename);

        return result
    }
}

export default ClassifyImageController;
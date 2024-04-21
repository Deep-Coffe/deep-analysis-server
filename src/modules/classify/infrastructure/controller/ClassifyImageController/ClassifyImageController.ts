import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import IAttachmentProvider from "@common/providers/IAttachmentProvider";
import { ClassifyImageOutputDTO } from "@modules/classify/domain/service/classifyImageService/ClassifyImageServiceDTO";
import { inject, injectable } from "tsyringe";
import IClassifyModel from "../../model/classifyModel/IClassifyModel";
import IQueue from "@application/queue/IQueue";

@injectable()
class ClassifyImageController implements IController {
    constructor(@inject('AttachmentProvider') private readonly _attachmentProvider: IAttachmentProvider,
        @inject('ClassifyModel') private readonly _classifyModel: IClassifyModel,
        @inject('Queue') private readonly queue: IQueue) { }

    public async handle({ payload }: ControllerInput<{ image: string }>): Promise<ClassifyImageOutputDTO> {
        const filename = await this._attachmentProvider.save(payload.image);

        this.queue.addJob(this._classifyModel.run);
        const result = await this.queue.enqueue<ClassifyImageOutputDTO, string>(filename);
        await this._attachmentProvider.remove(filename);

        return result
    }
}

export default ClassifyImageController;
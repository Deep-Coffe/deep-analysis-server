import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import GetAttachmentService from "@modules/attachment/domain/service/GetAttachmentService/GetAttachmentService";
import { injectable } from "tsyringe";

@injectable()
class GetAttachmentController implements IController {
    constructor(private readonly _getAttachmentService: GetAttachmentService) { }


    public async handle({ payload }: ControllerInput<{ fileName: string }>) {
        return await this._getAttachmentService.execute(payload.fileName);
    }
}

export default GetAttachmentController
import { inject, injectable } from "tsyringe";
import { ClassifyImageOutputDTO } from "./ClassifyImageServiceDTO";
import IClassifyModel from "@modules/analysis/infrastructure/model/classifyModel/IClassifyModel";

@injectable()
class ClassifyImageService {
    constructor(@inject('ClassifyModel') private readonly _classifyModel: IClassifyModel) { }

    public async execute(fileName: string): Promise<ClassifyImageOutputDTO> {
        return await this._classifyModel.run(fileName);
    }
}

export default ClassifyImageService;
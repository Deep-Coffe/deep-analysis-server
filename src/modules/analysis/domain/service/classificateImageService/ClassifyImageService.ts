import { inject, injectable } from "tsyringe";
import { ClassifyImageInputDTO, ClassifyImageOutputDTO } from "./ClassifyImageServiceDTO";
import IClassifyModel from "@modules/analysis/infrastructure/model/classifyModel/IClassifyModel";

@injectable()
class ClassifyImageService {
    constructor(@inject('ClassifyModel') private readonly _classifyModel: IClassifyModel) { }

    public async execute(data: ClassifyImageInputDTO): Promise<ClassifyImageOutputDTO> {
        return await this._classifyModel.run(data);
    }
}

export default ClassifyImageService;
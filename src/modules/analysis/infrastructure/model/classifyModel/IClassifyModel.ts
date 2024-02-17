import { ClassifyImageInputDTO, ClassifyImageOutputDTO } from "@modules/analysis/domain/service/classificateImageService/ClassifyImageServiceDTO";

export default interface IClassifyModel {
    run(data: string): Promise<ClassifyImageOutputDTO>;
}
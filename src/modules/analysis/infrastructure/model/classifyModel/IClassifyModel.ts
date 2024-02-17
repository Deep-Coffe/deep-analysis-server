import { ClassifyImageInputDTO, ClassifyImageOutputDTO } from "@modules/analysis/domain/service/classificateImageService/ClassifyImageServiceDTO";

export default interface IClassifyModel {
    run(data: ClassifyImageInputDTO): Promise<ClassifyImageOutputDTO>;
}
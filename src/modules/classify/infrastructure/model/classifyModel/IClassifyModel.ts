import { ClassifyImageOutputDTO } from "@modules/classify/domain/service/classifyImageService/ClassifyImageServiceDTO";

export default interface IClassifyModel {
    run(data: string): Promise<ClassifyImageOutputDTO>;
}
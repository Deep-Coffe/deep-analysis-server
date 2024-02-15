import { injectable } from "tsyringe";
import { ClassifyImageInputDTO, ClassifyImageOutputDTO } from "./ClassifyImageServiceDTO";

@injectable()
class ClassifyImageService {
    constructor() { }

    public async execute(data: ClassifyImageInputDTO): Promise<ClassifyImageOutputDTO> {

        await Promise.resolve()

        return {
            miner: Math.random(),
            phoma: Math.random(),
            cerscospora: Math.random(),
            leafRust: Math.random(),
            healthy: Math.random()
        }
    }
}

export default ClassifyImageService;
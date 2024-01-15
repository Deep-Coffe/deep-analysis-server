import PlagueRepository from "@modules/plague/infrastructure/repository/PlagueRepository";
import { inject, injectable } from "tsyringe";
import IPlagueRepository from "../../repository/IPlagueRepository";
import { CreatePlagueControllerInputDTO } from "@modules/plague/infrastructure/controller/CreatePlagueController/CreatePlagueControllerDTO";
import BadRequestError from "@application/error/BadRequestError";
import Plague from "../../entity/Plague";
import PlagueMapper from "@modules/plague/common/PlagueMapper";

@injectable()
class CreatePlagueService {
    constructor(@inject(PlagueRepository) private readonly _plagueRepository: IPlagueRepository) { }

    public async execute(data: CreatePlagueControllerInputDTO) {
        const plagueExists = await this._plagueRepository.findByName(data.name);

        if (plagueExists) throw new BadRequestError('Plague already exists!');

        const plague = Plague.createPlague(data);
        await this._plagueRepository.save(PlagueMapper.toPersist(plague));

        return plague;
    }
}

export default CreatePlagueService;
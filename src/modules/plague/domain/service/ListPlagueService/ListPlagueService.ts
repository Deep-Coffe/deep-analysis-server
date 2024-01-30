import { inject, injectable } from "tsyringe";
import IPlagueRepository from "../../repository/IPlagueRepository";

@injectable()
class ListPlagueService {
    constructor(@inject('PlagueRepository') private readonly _plagueRepository: IPlagueRepository) { }

    public async execute() {
        return await this._plagueRepository.findAll();
    }
}

export default ListPlagueService;
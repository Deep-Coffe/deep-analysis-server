import { IRepository } from "@application/repository/IRepository";
import { ListPlagueServiceOutput } from "../service/ListPlagueService/ListPlagueServiceDTO";
import Plague from "../entity/Plague";
import { PlagueSchemaType } from "@modules/plague/infrastructure/schema/PlagueSchema";

export default interface IPlagueRepository extends IRepository {
    findByName(name: string): Promise<Plague | undefined>;
    findById(id: string): Promise<Plague | undefined>;
    findAll(): Promise<ListPlagueServiceOutput[]>;
    save(plague: PlagueSchemaType): Promise<void>;
}
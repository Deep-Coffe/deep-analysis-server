import PlagueMapper from "@modules/plague/common/PlagueMapper";
import { PlagueSchemaType } from "../schema/PlagueSchema";
import { ListPlagueServiceOutput } from "@modules/plague/domain/service/ListPlagueService/ListPlagueServiceDTO";
import Plague from "@modules/plague/domain/entity/Plague";

export default class PlagueRepositoryMapper {
    static findAllToDomain(plagues: PlagueSchemaType[]): ListPlagueServiceOutput[] {
        return plagues.map(rawPlague => {
            const plague = PlagueMapper.toDomain(rawPlague) as Plague;
            return {
                id: plague?.id.toString(),
                name: plague?.props.name,
                description: plague?.props.description,
                analyzed: plague?.analyzed ?? false,
            }
        });
    }
}
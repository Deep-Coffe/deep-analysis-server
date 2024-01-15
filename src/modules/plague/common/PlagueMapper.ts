import Converter from "@application/helpers/Converter";
import Plague from "../domain/entity/Plague";
import { PlagueSchemaType } from "../infrastructure/schema/PlagueSchema";

export default class PlagueMapper {
    static toDomain(plague: PlagueSchemaType | null) {
        if (!plague) return;

        return Plague.createPlague({
            name: plague.name,
            description: plague.description
        },
            plague.id,
            Converter.convertDateMetadata(plague));
    }

    static toPersist(plague: Plague): PlagueSchemaType {
        return {
            id: plague.id.toString(),
            name: plague.props.name,
            description: plague.props.description,
            createdAt: plague.createdAt,
            updatedAt: plague.updatedAt,
        }
    }
}
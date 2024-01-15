import Analysis from "../domain/entity/Analysis";
import { AnalysisSchemaType } from "../infrastructure/schema/AnalysisSchema";

export default class AnalysisMapper {
    static toPersist(analysis: Analysis): AnalysisSchemaType {
        const plague = analysis.getPlague()
        return {
            id: analysis.id.toString(),
            ...analysis.props,
            plagueId: plague?.id.toString(),
            createdAt: analysis.createdAt,
            updatedAt: analysis.updatedAt,
        }
    }
}
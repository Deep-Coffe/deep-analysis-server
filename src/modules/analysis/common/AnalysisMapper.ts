import Analysis from "../domain/entity/Analysis";
import { AnalysisSchemaType } from "../infrastructure/schema/AnalysisSchema";

export default class AnalysisMapper {
    static toPersist(analysis: Analysis): AnalysisSchemaType {
        return {
            id: analysis.id.toString(),
            ...analysis.props,
            plagueId: analysis.getPlagueId(),
        }
    }
}
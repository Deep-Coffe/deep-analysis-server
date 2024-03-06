import Converter from "@application/helpers/Converter";
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

    static toDomain(raw?: AnalysisSchemaType | null) {
        if (!raw) return;

        const analysis = Analysis.createAnalysis({
            author: raw.author,
            name: raw.name,
            phoma: raw.phoma,
            cerscospora: raw.cerscospora,
            leafRust: raw.leafRust,
            miner: raw.miner,
            healthy: raw.healthy,
            analyzedAt: raw.analyzedAt,
        }, raw.id, Converter.convertDateMetadata(raw));

        return analysis;
    }
}
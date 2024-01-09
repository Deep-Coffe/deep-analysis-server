import IAnalysis from "@modules/analysis/domain/entity/IAnalysis";

export type ListAnalysisOutputDTO = IAnalysis & {
    id: string;
    plague: {
        name: string
    }
}
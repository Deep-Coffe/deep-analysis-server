import IAnalysis from "@modules/analysis/domain/entity/IAnalysis";

export type AddAnalysisControllerInputDTO = {
    author: string;
    image: string;
    name: string;
    analyzedAt?: Date;
};
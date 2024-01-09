import IAnalysis from "@modules/analysis/domain/entity/IAnalysis";

export type AddAnalysisServiceInputDTO = Omit<IAnalysis, 'createdAt' | 'analyzedAt'> & {
    analyzedAt?: Date;
};
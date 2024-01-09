import IAnalysis from "@modules/analysis/domain/entity/IAnalysis";

export type AddAnalysisControllerInputDTO = Omit<IAnalysis, 'createdAt' | 'userId' | 'analyzedAt'> & {
    analyzedAt?: Date;
};
import { ListAnalysisOutputDTO } from "./AnalysisRepositoryDTO";

class AnalysisRepositoryMapper {
    static list(raws: Record<string, unknown>[]): ListAnalysisOutputDTO[] {
        const analysisMap: Map<string, ListAnalysisOutputDTO> = new Map();

        raws.forEach(raw => {
            const id = raw.id as string;

            if (analysisMap.has(id)) {
                const existingAnalysis = analysisMap.get(id);

                existingAnalysis?.treatments.push({
                    id: raw.treatment_id as string,
                    name: raw.treatment_name as string,
                    consumables: raw.consumable_id ? [{
                        quantity: raw.treatment_consumable_quantity as number,
                        consumable: {
                            id: raw.consumable_id as string,
                            name: raw.consumable_name as string
                        }
                    }] : []
                });

            } else {
                const newAnalysis: ListAnalysisOutputDTO = {
                    id: raw.id as string,
                    author: raw.author as string,
                    name: raw.name as string,
                    phoma: raw.phoma as number,
                    cerscospora: raw.cerscospora as number,
                    leafRust: raw.leafrust as number,
                    miner: raw.miner as number,
                    healthy: raw.healthy as number,
                    analyzedAt: raw.analyzedat as Date,
                    attachment: {
                        fileName: raw.filename as string,
                    },
                    plague: {
                        id: raw.plague_id as string,
                        name: raw.plague_name as string
                    },
                    treatments: raw.treatment_id ? [{
                        id: raw.treatment_id as string,
                        name: raw.treatment_name as string,
                        consumables: raw.consumable_id ? [{
                            quantity: raw.treatment_consumable_quantity as number,
                            consumable: {
                                id: raw.consumable_id as string,
                                name: raw.consumable_name as string,
                            }
                        }] : []
                    }] : []
                };

                analysisMap.set(id, newAnalysis);
            }
        });

        return Array.from(analysisMap.values());
    }
}

export default AnalysisRepositoryMapper;
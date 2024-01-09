import { ListAnalysisOutputDTO } from "./AnalysisRepositoryDTO";

class AnalysisRepositoryMapper {
    static list(raws: Record<string, unknown>[]): ListAnalysisOutputDTO[] {
        return raws.map(raw => {
            return {
                ...raw,
                plague: {
                    name: raw.plague_name
                }
            }
        }) as ListAnalysisOutputDTO[];
    }
}

export default AnalysisRepositoryMapper;
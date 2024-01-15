import IPlagueStrategy from "./IPlagueStrategy";
import { PlagueEnum } from "@common/enum/PlagueEnum";
import IAnalysis from "../../entity/IAnalysis";
import Plague from "@modules/plague/domain/entity/Plague";

class PhomaStrategy implements IPlagueStrategy {

    public analyser(analysisData: IAnalysis): Plague | undefined {
        if (analysisData.phoma >= 0.9) return Plague.createPlague({ name: PlagueEnum.Phoma, percent: analysisData.phoma });
    }
}

export default PhomaStrategy;
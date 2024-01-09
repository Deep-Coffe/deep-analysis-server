import Plague from "@modules/valueObject/plague/Plague";
import IPlagueStrategy from "./IPlagueStrategy";
import { PlagueEnum } from "@common/enum/Plague";
import IAnalysis from "../../entity/IAnalysis";

class PhomaStrategy implements IPlagueStrategy {

    public analyser(analysisData: IAnalysis): Plague | undefined {
        if (analysisData.phoma >= 0.9) return new Plague(PlagueEnum.Phoma, analysisData.phoma);
    }
}

export default PhomaStrategy;
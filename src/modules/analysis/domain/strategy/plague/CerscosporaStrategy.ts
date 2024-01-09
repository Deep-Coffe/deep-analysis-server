import Plague from "@modules/valueObject/plague/Plague";
import IPlagueStrategy from "./IPlagueStrategy";
import { PlagueEnum } from "@common/enum/Plague";
import IAnalysis from "../../entity/IAnalysis";

class CerscosporaStrategy implements IPlagueStrategy {

    public analyser(analysisData: IAnalysis): Plague | undefined {
        if (analysisData.cerscospora >= 0.9) return new Plague(PlagueEnum.Cerscospora, analysisData.cerscospora);
    }
}

export default CerscosporaStrategy;
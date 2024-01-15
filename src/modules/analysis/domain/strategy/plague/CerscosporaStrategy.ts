import IPlagueStrategy from "./IPlagueStrategy";
import { PlagueEnum } from "@common/enum/PlagueEnum";
import IAnalysis from "../../entity/IAnalysis";
import Plague from "@modules/plague/domain/entity/Plague";

class CerscosporaStrategy implements IPlagueStrategy {

    public analyser(analysisData: IAnalysis): Plague | undefined {
        if (analysisData.cerscospora >= 0.9) return Plague.createPlague({ name: PlagueEnum.Cerscospora, percent: analysisData.cerscospora });
    }
}

export default CerscosporaStrategy;
import Plague from "@modules/valueObject/plague/Plague";
import IPlagueStrategy from "./IPlagueStrategy";
import { PlagueEnum } from "@common/enum/Plague";
import IAnalysis from "../../entity/IAnalysis";

class MinerStrategy implements IPlagueStrategy {

    public analyser(analysisData: IAnalysis): Plague | undefined {
        if (analysisData.miner >= 0.9) return new Plague(PlagueEnum.Miner, analysisData.miner);
    }
}

export default MinerStrategy;
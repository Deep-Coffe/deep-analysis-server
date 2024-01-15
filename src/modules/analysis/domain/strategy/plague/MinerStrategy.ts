import IPlagueStrategy from "./IPlagueStrategy";
import { PlagueEnum } from "@common/enum/PlagueEnum";
import IAnalysis from "../../entity/IAnalysis";
import Plague from "@modules/plague/domain/entity/Plague";

class MinerStrategy implements IPlagueStrategy {

    public analyser(analysisData: IAnalysis): Plague | undefined {
        if (analysisData.miner >= 0.9) return Plague.createPlague({ name: PlagueEnum.Miner, percent: analysisData.miner });
    }
}

export default MinerStrategy;
import IPlagueStrategy from "./IPlagueStrategy";
import { PlagueEnum } from "@common/enum/PlagueEnum";
import IAnalysis from "../../entity/IAnalysis";
import Plague from "@modules/plague/domain/entity/Plague";

class UnknownPlagueStrategy implements IPlagueStrategy {

    public analyser(analysisData: IAnalysis): Plague | undefined {
        if (analysisData.leafRust >= 0.9 && analysisData.miner >= 0.9 && analysisData.cerscospora >= 0.9 && analysisData.phoma >= 0.9 && analysisData.healthy >= 0.9)
            return Plague.createPlague({ name: PlagueEnum.Unknown, percent: analysisData.healthy });
    }
}

export default UnknownPlagueStrategy;
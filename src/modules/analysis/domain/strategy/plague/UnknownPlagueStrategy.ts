import Plague from "@modules/valueObject/plague/Plague";
import IPlagueStrategy from "./IPlagueStrategy";
import { PlagueEnum } from "@common/enum/Plague";
import IAnalysis from "../../entity/IAnalysis";

class UnknownPlagueStrategy implements IPlagueStrategy {

    public analyser(analysisData: IAnalysis): Plague | undefined {
        if (analysisData.leafRust <= 0.9 && analysisData.miner <= 0.9 && analysisData.cerscospora <= 0.9 && analysisData.phoma <= 0.9 && analysisData.healthy <= 0.9)
            return new Plague(PlagueEnum.Unknown, analysisData.healthy);
    }
}

export default UnknownPlagueStrategy;
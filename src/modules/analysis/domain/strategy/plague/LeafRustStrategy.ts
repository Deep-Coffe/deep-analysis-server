import Plague from "@modules/valueObject/plague/Plague";
import IPlagueStrategy from "./IPlagueStrategy";
import { PlagueEnum } from "@common/enum/Plague";
import IAnalysis from "../../entity/IAnalysis";

class LeafRustStrategy implements IPlagueStrategy {

    public analyser(analysisData: IAnalysis): Plague | undefined {
        if (analysisData.leafRust >= 0.9) return new Plague(PlagueEnum.LeafRust, analysisData.leafRust);
    }
}

export default LeafRustStrategy;
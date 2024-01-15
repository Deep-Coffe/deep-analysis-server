import IPlagueStrategy from "./IPlagueStrategy";
import { PlagueEnum } from "@common/enum/PlagueEnum";
import IAnalysis from "../../entity/IAnalysis";
import Plague from "@modules/plague/domain/entity/Plague";

class LeafRustStrategy implements IPlagueStrategy {

    public analyser(analysisData: IAnalysis): Plague | undefined {
        if (analysisData.leafRust >= 0.9) return Plague.createPlague({ name: PlagueEnum.LeafRust, percent: analysisData.leafRust });
    }
}

export default LeafRustStrategy;
import Plague from "@modules/plague/domain/entity/Plague";
import IAnalysis from "../../entity/IAnalysis";

export default interface IPlagueStrategy {
    analyser(analysisData: IAnalysis): Plague | undefined;
}
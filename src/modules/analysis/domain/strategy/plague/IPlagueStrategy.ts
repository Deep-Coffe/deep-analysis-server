import Plague from "@modules/valueObject/plague/Plague";
import IAnalysis from "../../entity/IAnalysis";

export default interface IPlagueStrategy {
    analyser(analysisData: IAnalysis): Plague | undefined;
}
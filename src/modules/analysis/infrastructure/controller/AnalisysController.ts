import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import { injectable } from "tsyringe";

@injectable()
class AnalysisController implements IController {

    public handle(data: ControllerInput) {
        console.log(data);

    }
}

export default AnalysisController;
import { ControllerInput, ControllerOutput } from "./ControllerIO";

export default interface IController {
    handle(data: ControllerInput): ControllerOutput;
}
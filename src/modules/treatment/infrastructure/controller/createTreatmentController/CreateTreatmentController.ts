import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import { injectable } from "tsyringe";
import { CreateControllerTreatmentInputDTO } from "./CreateTreatmentControllerDTO";
import FindOrCreateConsumableService from "@modules/consumable/domain/service/findOrCreateConsumableService/FindOrCreateConsumableService";
import CreateTreatmentService from "@modules/treatment/domain/service/createTreatmentService/CreateTreatmentService";
import TreatmentPresenter from "../../presenter/TreatmentPresenter";

@injectable()
class CreateTreatmentController implements IController {
    constructor(private readonly _findOrCreateConsumableService: FindOrCreateConsumableService,
        private readonly _createTreatmentService: CreateTreatmentService) { }

    public async handle({ payload }: ControllerInput<CreateControllerTreatmentInputDTO>) {
        const consumables = await Promise.all(payload.consumables.map(async ({ consumable, quantity }) => {
            const consumableData = await this._findOrCreateConsumableService.execute(consumable);

            return {
                consumable: consumableData,
                quantity,
            }
        }));

        const treatment = await this._createTreatmentService.execute({
            plagueId: payload.plagueId,
            name: payload.name,
            consumables: consumables,
        });

        return TreatmentPresenter.treatmentConsumableOutput(treatment);

    }
}

export default CreateTreatmentController;
import Consumable from "@modules/consumable/domain/entity/Consumable";
import ITreatment from "../../entity/ITreatment";
import { PlagueEnum } from "@common/enum/Plague";

export type CreateTreatmentServiceInputDTO = Omit<ITreatment, 'plagueId'> & {
    plagueName: PlagueEnum;
    consumables: {
        quantity: number,
        consumable: Consumable,
    }[]
}
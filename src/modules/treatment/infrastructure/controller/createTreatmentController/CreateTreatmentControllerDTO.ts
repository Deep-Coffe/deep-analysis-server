import { PlagueEnum } from "@common/enum/Plague";
import ITreatment from "@modules/treatment/domain/entity/ITreatment";

export type CreateControllerTreatmentInputDTO = Omit<ITreatment, 'plagueId'> & {
    plagueName: PlagueEnum;
    consumables: {
        consumable: { id: string } | { name: string };
        quantity: number;
    }[]
}
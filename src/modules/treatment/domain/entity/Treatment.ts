import Entity from "@application/entity/Entity";
import ITreatment from "./ITreatment";
import { DateMetadata } from "@application/entity/DateMetadata";

class Treatment extends Entity<ITreatment> {
    private constructor(props: ITreatment, id?: string, date?: DateMetadata) {
        super(props, id, date);
    }

    static createTreatment(props: ITreatment, id?: string, date?: DateMetadata) {
        return new Treatment(props, id, date);
    }
}

export default Treatment;
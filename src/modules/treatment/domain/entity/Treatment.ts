import Entity from "@application/entity/Entity";
import ITreatment from "./ITreatment";

class Treatment extends Entity<ITreatment> {
    private constructor(props: ITreatment, id?: string) {
        super(props, id);
    }

    static createTreatment(props: ITreatment, id?: string) {
        return new Treatment(props, id);
    }
}

export default Treatment;
import Entity from "@application/entity/Entity";
import IPlague from "./IPlague";
import { DateMetadata } from "@application/entity/DateMetadata";
import { PlagueEnum } from "@common/enum/PlagueEnum";
import Guid from "@application/entity/Guid";

class Plague extends Entity<IPlague> {
    public readonly percent?: number;
    public readonly analyzed?: boolean;

    private constructor(props: IPlague, percent?: number, id?: string, date?: DateMetadata) {
        super(props, id, date);

        this.percent = percent;
        this.analyzed = (Object.values(PlagueEnum) as string[]).includes(props.name)
    }

    public setId(id: Guid) {
        this.id = id;
    }

    static createPlague({ percent, ...props }: IPlague & { percent?: number }, id?: string, date?: DateMetadata) {
        return new Plague(props, percent, id, date);
    }
}

export default Plague;
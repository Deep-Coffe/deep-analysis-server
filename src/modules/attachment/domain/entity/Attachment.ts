import Entity from "@application/entity/Entity";
import IAttachment from "./IAttachment";

class Attachment extends Entity<IAttachment> {
    private constructor(props: IAttachment, id?: string) {
        super(props, id);
    }

    static createAttachment(props: IAttachment, id?: string) {
        return new Attachment(props, id);
    }
}

export default Attachment;
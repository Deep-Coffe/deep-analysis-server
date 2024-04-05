import { Types } from "@application/types/Types";
import LocalAttachmentProvider from "@common/providers/LocalAttachmentProvider";
import ClassifyModel from "@modules/classify/infrastructure/model/classifyModel/ClassifyModel";
import { container } from "tsyringe";

class Injection {
    public resolver<T>(target: Types<T>): T {
        container.register('AttachmentProvider', { useValue: new LocalAttachmentProvider() });
        container.register('ClassifyModel', { useValue: new ClassifyModel() });

        return container.resolve(target);
    }
}

export default Injection;
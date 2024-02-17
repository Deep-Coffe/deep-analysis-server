import RepositoryFactory from "@application/repository/RepositoryFactory";
import { Types } from "@application/types/Types";
import LocalAttachmentProvider from "@common/providers/LocalAttachmentProvider";
import ClassifyModel from "@modules/analysis/infrastructure/model/classifyModel/ClassifyModel";
import { container } from "tsyringe";
import { QueryRunner } from "typeorm";

class Injection {
    public resolver<T>(target: Types<T>, queryRunner?: QueryRunner): T {
        if (queryRunner) {
            RepositoryFactory.createRepositories(queryRunner);
        }

        container.register('AttachmentProvider', { useValue: new LocalAttachmentProvider() });
        container.register('ClassifyModel', { useValue: new ClassifyModel() });

        return container.resolve(target);
    }
}

export default Injection;
import RepositoryFactory from "@application/repository/RepositoryFactory";
import { Types } from "@application/types/Types";
import MessageSubject from "@common/observers/subject/MessageSubject";
import { container } from "tsyringe";
import { QueryRunner } from "typeorm";

class Injection {
    public resolver<T>(target: Types<T>, queryRunner?: QueryRunner, messageSubject?: MessageSubject): T {
        if (queryRunner) {
            RepositoryFactory.createRepositories(queryRunner);
        }
        container.register(MessageSubject, { useValue: messageSubject });
        return container.resolve(target);
    }
}

export default Injection;
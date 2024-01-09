import RepositoryFactory from "@application/repository/RepositoryFactory";
import { Types } from "@application/types/Types";
import { container } from "tsyringe";
import { QueryRunner } from "typeorm";

class Injection {
    public resolver<T>(target: Types<T>, queryRunner?: QueryRunner): T {
        if (queryRunner) {
            RepositoryFactory.createRepositories(queryRunner);
        }

        return container.resolve(target);
    }
}

export default Injection;
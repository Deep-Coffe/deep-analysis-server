import { Types } from "@application/types/Types";
import { IRepository } from "./IRepository";
import { EntitySchema, QueryRunner } from "typeorm";
import { container } from "tsyringe";

type targetType = {
    repository: Types<IRepository>,
    schema: EntitySchema,
}

class RepositoryFactory {
    static repositories: Map<string, targetType> = new Map();

    static register(repositoryKey: string, schema: EntitySchema) {
        return function (repository: Types) {
            RepositoryFactory.repositories.set(repositoryKey, {
                repository,
                schema
            });
        }
    }

    static createRepositories(queryRunner: QueryRunner) {
        RepositoryFactory.repositories.forEach((val, key) => {
            container.register(key, { useValue: new val.repository(queryRunner.manager.getRepository(val.schema)) });
        });
    }
}

export default RepositoryFactory;
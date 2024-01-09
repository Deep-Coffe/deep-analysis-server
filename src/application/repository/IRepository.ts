import { EntitySchema, Repository } from "typeorm";

export declare class IRepository {
    constructor(repository: Repository<EntitySchema>);
}
import { DbEnvConfig } from "@config/env/DbEnvConfig";
import { DataSource } from "typeorm";

class AppDataSource {
    constructor() { }

    static appDataSource = new DataSource({
        ...DbEnvConfig,
        type: 'postgres',
        entities: ['src/modules/*/infrastructure/schema/*.ts', 'src/modules/valueObject/*/schema/*.ts'],
        migrations: ['src/common/migrations/*.ts'],
    });

    static getQueryRunner() {
        const queryRunner = AppDataSource.appDataSource.createQueryRunner();

        return queryRunner;
    }

    static async connect() {
        await AppDataSource.appDataSource.initialize();
        if (await (AppDataSource.appDataSource.showMigrations()))
            await AppDataSource.appDataSource.runMigrations();
    }
}

export default AppDataSource;
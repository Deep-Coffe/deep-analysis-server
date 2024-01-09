import AppDataSource from "@application/database/AppDataSource";
import ISetup from "./ISetup";
import Logger from "@application/config/LoggerConfig";
import path from 'path'
import fs from 'fs'

class DataBaseSetup implements ISetup {

    public appDataSource: AppDataSource;

    constructor() {
        this.appDataSource = new AppDataSource();
    }

    private setupRepositories() {
        Logger.info('Run all repositories:')
        const modulesDir = path.join(__dirname, '..', '..', 'modules');

        const moduleFolders = fs.readdirSync(modulesDir).filter(item =>
            fs.statSync(path.join(modulesDir, item)).isDirectory()
        );

        moduleFolders.forEach(moduleFolder => {
            const repositoryDir = path.join(modulesDir, moduleFolder, 'infrastructure', 'repository');

            if (fs.existsSync(repositoryDir)) {
                const repositoryFile = fs.readdirSync(repositoryDir);

                const repositoriesModule = repositoryFile
                    .filter(file => file.endsWith('.ts'))
                    .map(file => require(path.join(repositoryDir, file)));

                repositoriesModule.forEach(repositoryModule => {
                    if (repositoryModule.default)
                        Logger.info(`Configuring repository: ${repositoryModule.default.name}`);
                });
            }
        });
    }

    public async run() {
        Logger.info('Try connect with database');
        this.setupRepositories();
        try {
            await AppDataSource.connect();
            Logger.info('DataBase connect with Success');

        } catch (err) {
            Logger.warn('Connect with DB failed!');
            Logger.error(err as Error);
        }
    }
}

export default DataBaseSetup;
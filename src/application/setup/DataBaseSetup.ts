import AppDataSource from "@application/database/AppDataSource";
import ISetup from "./ISetup";
import Logger from "@application/config/LoggerConfig";

class DataBaseSetup implements ISetup {

    public appDataSource: AppDataSource;

    constructor() {
        this.appDataSource = new AppDataSource();
    }

    public async run() {
        Logger.info('Try connect with database');
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
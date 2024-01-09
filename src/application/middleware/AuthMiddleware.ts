import Logger from "@application/config/LoggerConfig";
import AppDataSource from "@application/database/AppDataSource";
import Injection from "@application/helpers/Injection";
import AuthProvider from "@application/provider/AuthProvider";
import FindOrCreateService from "@modules/user/domain/service/findOrCreateService/FindOrCreateService";
import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";

@injectable()
class AuthMiddleware {
    constructor(private readonly _authProvider: AuthProvider) { }

    public handle = (injection: Injection, isAuth?: boolean) => async (req: Request, res: Response, next: NextFunction) => {
        if (!isAuth) return next();

        try {
            const userId = this._authProvider.verify(req.headers.authorization);

            const queryRunner = AppDataSource.getQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const findOrCreateService = injection.resolver(FindOrCreateService, queryRunner);
            const id = await findOrCreateService.execute(userId);

            await queryRunner.commitTransaction();

            req.user = {
                id: id
            };

            return next();
        } catch (err) {
            Logger.error(err as Error)
            next(err);
        }
    }
}

export default AuthMiddleware;
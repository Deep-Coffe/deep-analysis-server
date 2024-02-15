import Logger from "@application/config/LoggerConfig";
import AuthProvider from "@common/providers/AuthProvider";
import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";

@injectable()
class AuthMiddleware {
    constructor(private readonly _authProvider: AuthProvider) { }

    public handle = (isAuth?: boolean) => async (req: Request, res: Response, next: NextFunction) => {
        if (!isAuth) return next();

        try {
            const userId = this._authProvider.verify(req.headers.authorization);

            req.user = {
                id: userId
            };

            return next();
        } catch (err) {
            Logger.error(err as Error)
            next(err);
        }
    }
}

export default AuthMiddleware;
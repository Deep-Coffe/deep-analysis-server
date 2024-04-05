import IController from "@application/controller/IController";
import { Types } from "@application/types/Types";
import { NextFunction, Request, Response } from "express";
import ControllerMiddleware from "./ControllerMiddleware";
import { injectable } from "tsyringe";
import { ControllerInput } from "@application/controller/ControllerIO";
import AppError from "@application/error/AppError";
import ServerError from "@application/error/ServerError";
import Injection from "@application/helpers/Injection";
import Logger from "@application/config/LoggerConfig";

@injectable()
class RouterMiddleware {
    constructor(private readonly controllerMiddleware: ControllerMiddleware) { }

    public handle = (target: Types<IController>, injection: Injection, responseStatus = 200) => async (req: Request, res: Response, next: NextFunction) => {
        const data: ControllerInput<Record<string, unknown>> = {
            payload: {
                ...req.params,
                ...req.body,
                ...req.query,
            },
            user: {
                id: req?.user?.id ?? '',
            },
        };

        try {
            const response = await this.controllerMiddleware.handle(target, injection, data);
            res.status(responseStatus).json({
                data: response
            });
        } catch (error) {
            Logger.error(error as Error)
            if (error instanceof AppError) {
                next(error);
            }

            next(new ServerError('Controller return unknown error'))
        }
    }
}

export default RouterMiddleware;
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
import Stream from 'stream'

@injectable()
class RouterMiddleware {
    constructor(private readonly controllerMiddleware: ControllerMiddleware) { }

    public handle = (target: Types<IController>, injection: Injection, responseStatus = 200, isStream = false) => async (req: Request, res: Response, next: NextFunction) => {
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


            if (!isStream) {
                res.status(responseStatus).json({
                    data: response
                });
            } else {
                const readableStream = new Stream.Readable();
                readableStream.push(JSON.stringify(response));
                readableStream.push(null);

                res.set('Content-Type', 'application/json');

                readableStream.pipe(res);
            }

        } catch (error) {
            Logger.error(error as Error)
            if (error instanceof AppError) {
                next(error);
            }
            console.log(error);

            next(new ServerError('Controller return unknown error'))
        }
    }
}

export default RouterMiddleware;
import { ControllerInput } from "@application/controller/ControllerIO";
import PayloadInvalidError from "@application/error/PayloadInvalidError";
import { Types } from "@application/types/Types";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

class ValidatorMiddleware {
    static handle = <V>(validator?: Types<V>, validatorMethod?: keyof V) => (req: Request, res: Response, nextFunction: NextFunction) => {
        if (!validator || !validatorMethod) return nextFunction();
        const payload: Record<string, unknown> = {
            ...req.params,
            ...req.body,
            ...req.query,
        };

        const validatorObject = new validator();
        const validationMethodToCall = Reflect.get(validatorObject as object, validatorMethod as keyof V) as (data: Omit<ControllerInput, 'user'>) => Joi.ValidationResult;

        if (!validationMethodToCall) return;

        const { error } = validationMethodToCall({ payload });

        if (error) {
            nextFunction(new PayloadInvalidError(error.message));
        }

        return nextFunction();
    }
}

export default ValidatorMiddleware;
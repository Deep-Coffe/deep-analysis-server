import Joi from "joi";

class UserValidation {
    public createUser() {
        return Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            phone: Joi.string()
        });
    }

    public createSession() {
        return Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
    }
}

export default UserValidation;
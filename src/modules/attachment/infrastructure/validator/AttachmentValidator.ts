import Joi from "joi";

class AttachmentValidator {
    public getAttachmentValidate() {
        return Joi.object({
            fileName: Joi.string().regex(/^[0-9a-fA-F]{20}\.jpg$/).required(),
        })
    }
}

export default AttachmentValidator;
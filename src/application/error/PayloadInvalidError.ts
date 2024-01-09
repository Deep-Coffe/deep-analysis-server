import AppError from "./AppError";

class PayloadInvalidError extends AppError {
    public message: string;
    public statusCode: number;
    public name: string;
    public stack?: string | undefined;

    constructor(message: string) {
        super()
        this.message = message;
        this.statusCode = 400;
        this.name = 'InvalidPayload'
    }


    public getDetails() {
        return {
            error: {
                message: this.message,
                status: this.statusCode,
                name: this.name,
            }
        }
    }
}

export default PayloadInvalidError;
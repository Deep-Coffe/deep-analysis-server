import AppError from "./AppError";

class AuthenticateError extends AppError {
    public message: string;
    public statusCode: number;
    public name: string;
    public stack?: string | undefined;

    constructor(message: string) {
        super()
        this.message = message;
        this.statusCode = 403;
        this.name = 'AuthenticateError'
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

export default AuthenticateError;
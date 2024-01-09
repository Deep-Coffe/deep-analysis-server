import AppError from "./AppError";

class NotFoundError extends AppError {
    public message: string;
    public statusCode: number;
    public name: string;
    public stack?: string | undefined;

    constructor(message: string) {
        super()
        this.message = message;
        this.statusCode = 404;
        this.name = 'NotFound'
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

export default NotFoundError;
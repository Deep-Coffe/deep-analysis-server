import AppError from "./AppError";

class ServerError extends AppError {
    public message: string;
    public statusCode: number;
    public name: string;
    public stack?: string | undefined;

    constructor(message: string) {
        super()
        this.message = message;
        this.statusCode = 500;
        this.name = 'ServerError'
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

export default ServerError;
import { ErrorDetailsType } from "./ErrorDetailsType";

export default abstract class AppError extends Error {
    abstract statusCode: number;

    abstract getDetails(): ErrorDetailsType
}
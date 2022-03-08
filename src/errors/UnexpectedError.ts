import { ErrorID } from "../enums/ErrorId";
import { RequestError } from "./RequestError";

export class UnexpectedError implements RequestError {
    public id: ErrorID;
    public name: string;
    public message: string;
    public status: number;

    constructor(message: string) {
        this.id = ErrorID.UnexpectedError;
        this.name = "unexpected_error";
        this.message = message;
        this.status = 500;
    }
}
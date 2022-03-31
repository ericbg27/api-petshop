import { ErrorID } from "../enums/ErrorId";
import { RequestError } from "./RequestError";

export class NotFound implements RequestError {
    public id: ErrorID;
    public name: string;
    public message: string;
    public status: number;

    constructor(message: string) {
        this.id = ErrorID.NotFound;
        this.name = "not_found";
        this.message = message;
        this.status = 404;
    }
}
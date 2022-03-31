import { ErrorID } from "../enums/ErrorId";
import { RequestError } from "./RequestError";

export class BadRequest implements RequestError {
    public id: ErrorID;
    public name: string;
    public message: string;
    public status: number;

    constructor(message: string) {
        this.id = ErrorID.BadRequest;
        this.name = "bad_request";
        this.message = message;
        this.status = 400;
    }
};
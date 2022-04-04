import { ErrorID } from "../enums/ErrorId";
import { RequestError } from "./RequestError";

export class Unauthorized implements RequestError {
    public id: ErrorID;
    public name: string;
    public message: string;
    public status: number;

    constructor(message: string) {
        this.id = ErrorID.Unauthorized;
        this.name = "unauthorized";
        this.message = message;
        this.status = 401;
    }
};
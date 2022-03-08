import { ErrorID } from "../enums/ErrorId";
import { RequestError } from "./RequestError";

export class InvalidInput implements RequestError {
    public id: ErrorID;
    public name: string;
    public message: string;
    public status: number;

    constructor(inputName: string) {
        this.id = ErrorID.InvalidInput;
        this.name = "invalid_input";
        this.message = `Invalid ${inputName} provided`;
        this.status = 400;
    }
}
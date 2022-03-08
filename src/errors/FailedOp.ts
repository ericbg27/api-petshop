import { ErrorID } from "../enums/ErrorId";
import { RequestError } from "./RequestError";

export class FailedOp implements RequestError {
    public id: ErrorID;
    public name: string;
    public message: string;
    public status: number;

    constructor(op: string, entity: string) {
        this.id = ErrorID.InvalidInput;
        this.name = "invalid_input";
        this.message = `Failed to ${op} ${entity}`;
        this.status = 500;
    }
}
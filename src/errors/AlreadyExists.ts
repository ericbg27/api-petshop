import { ErrorID } from "../enums/ErrorId";
import { RequestError } from "./RequestError";

export class AlreadyExists implements RequestError {
    public id: ErrorID;
    public name: string;
    public message: string;
    public status: number;

    constructor(prop: string) {
        this.id = ErrorID.AlreadyExists;
        this.name = "already_exists";
        this.message = `${prop} already exists.`;
        this.status = 400;
    }
}
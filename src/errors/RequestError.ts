import { ErrorID } from "../enums/ErrorId"

export interface RequestError {
    id: ErrorID;
    name: string;
    message: string;
    status: number;
}
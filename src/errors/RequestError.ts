import { ErrorID } from "../enums/ErrorId"

interface RequestError extends Error {
    id: ErrorID;
    name: string;
    status: number;
}

function isRequestError(arg: any): arg is RequestError {
    return arg.id && arg.name && arg.message && arg.status;
}

export {
    RequestError,
    isRequestError
}
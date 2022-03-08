import express, { Request, Response } from "express";
import { isRequestError, RequestError } from "./errors/RequestError";
import { UnexpectedError } from "./errors/UnexpectedError";
import { supplierRouter } from "./routes/supplierRoutes";

const app = express();

app.use(express.json());

app.use("/suppliers", supplierRouter);

app.use(function(error: any, req: Request, res: Response, next: any) {
    let err = error;
    if(!isRequestError(error)) {
        err = new UnexpectedError(error.message);
    }

    res.status(err.status);
    res.send(JSON.stringify(
        {
            message: err.message,
            id: err.id,
            name: err.name
        }
    ));

    next();
});

export { app };
import { Request, Response } from "express";
import { isRequestError } from "../../errors/RequestError";
import { UnexpectedError } from "../../errors/UnexpectedError";
import { FindSuppliersUseCase } from "./FindSuppliersUseCase";

export class FindSuppliersController {
    constructor(
        private findSuppliersUseCase: FindSuppliersUseCase
    ) {}

    async handle(req: Request, res: Response, next: any): Promise<Response> {
        try {
            const result = await this.findSuppliersUseCase.execute();
            
            res.status(200);
            return res.send(JSON.stringify(result));
        } catch(error) {
            return next(error);
        }
    }
}
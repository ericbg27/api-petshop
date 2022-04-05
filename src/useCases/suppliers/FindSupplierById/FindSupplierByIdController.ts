import { Request, Response } from "express";
import { FindSupplierByIdUseCase } from "./FindSupplierByIdUseCase";

import { BadRequest } from "../../../errors/BadRequest";

export class FindSupplierByIdController {
    constructor(
        private findSupplierByIdUseCase: FindSupplierByIdUseCase
    ) {}

    async handle(req: Request, res: Response, next: any): Promise<Response> {
        try {
            if(!req.params.supplierId) { // TODO: Maybe have this as a middleware
                const idErr = new BadRequest("Invalid supplier ID sent in request");
                return next(idErr);
            }

            const supplierId = parseInt(req.params.supplierId);
            const result = await this.findSupplierByIdUseCase.execute(supplierId);

            res.status(200);
            return res.send(JSON.stringify(result));
        } catch(error) {
            return next(error);
        }
    }
}
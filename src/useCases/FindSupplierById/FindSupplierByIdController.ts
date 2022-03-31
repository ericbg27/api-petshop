import { Request, Response } from "express";
import { FindSupplierByIdUseCase } from "./FindSupplierByIdUseCase";

export class FindSupplierByIdController {
    constructor(
        private findSupplierByIdUseCase: FindSupplierByIdUseCase
    ) {}

    async handle(req: Request, res: Response, next: any): Promise<Response> {
        try {
            const supplierId = parseInt(req.params.supplierId);
            const result = await this.findSupplierByIdUseCase.execute(supplierId);

            res.status(200);
            return res.send(JSON.stringify(result));
        } catch(error) {
            return next(error);
        }
    }
}
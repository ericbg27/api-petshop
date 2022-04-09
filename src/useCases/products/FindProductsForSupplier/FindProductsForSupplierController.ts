import { Request, Response } from "express";
import { BadRequest } from "../../../errors/BadRequest";
import { FindProductsForSupplierUseCase } from "./FindProductsForSupplierUseCase";

export class FindProductForSupplierController {
    constructor(
        private findProductsForSupplierUseCase: FindProductsForSupplierUseCase
    ) {}

    async handle(req: Request, res: Response, next: any): Promise<Response> {
        if(!req.params.supplierId) {
            const supplierIdErr = new BadRequest("Invalid supplier ID sent in the request");
            next(supplierIdErr);
        }

        try {
            const supplierId = parseInt(req.params.supplierId);
            const products = await this.findProductsForSupplierUseCase.execute(supplierId);

            return res.status(200).send(JSON.stringify(products));
        } catch(error) {
            return next(error);
        }
    }
}
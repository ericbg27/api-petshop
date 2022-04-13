import { Request, Response } from "express";
import { BadRequest } from "../../../errors/BadRequest";
import { UpdateSupplierUseCase } from "./UpdateSupplierUseCase";

export class UpdateSupplierController {
    constructor(
        private updateSupplierUseCase: UpdateSupplierUseCase
    ) {}

    async handle(req: Request, res: Response, next: any, partial: boolean): Promise<Response> {
        if(!req.params.supplierId) { // TODO: Maybe have this as a middleware
            const idErr = new BadRequest("Invalid supplier ID sent in request");
            return next(idErr);
        }

        const { email, company, category } = req.body;
        const supplierId = parseInt(req.params.supplierId);

        const userData = {
            email,
            company, 
            category,
            partial
        }
        
        try {
            const updatedSupplier = await this.updateSupplierUseCase.exec(supplierId, userData);

            return res.status(200).send(JSON.stringify(updatedSupplier));
        } catch(error) {
            return next(error);
        }
    }
};
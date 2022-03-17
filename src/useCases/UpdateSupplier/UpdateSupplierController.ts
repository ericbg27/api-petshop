import { Request, Response } from "express";
import { BadRequest } from "../../errors/BadRequest";
import { UpdateSupplierUseCase } from "./UpdateSupplierUseCase";

export class UpdateSupplierController {
    constructor(
        private updateSupplierUseCase: UpdateSupplierUseCase
    ) {}

    async handle(req: Request, res: Response, next: any, partial: boolean) {
        if(!req.params.supplierId) { // TODO: Maybe have this as a middleware
            const idErr = new BadRequest("Invalid supplier ID sent in request");
            next(idErr);

            return;
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
            this.updateSupplierUseCase.exec(supplierId, userData);
        } catch(error) {
            next(error);
        }
    }
};
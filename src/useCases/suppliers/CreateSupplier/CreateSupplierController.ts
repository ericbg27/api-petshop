import { Request, Response } from "express";
import { Supplier } from "../../../entities/Supplier";
import { CreateSupplierUseCase } from "./CreateSupplierUseCase";

export class CreateSupplierController {
    constructor(
        private createSupplierUseCase: CreateSupplierUseCase
    ) {}

    async handle(req: Request, res: Response, next: any): Promise<Response> {
        let { email, company, category, password } = req.body;
        
        try {
            let supplierToCreate = new Supplier({ email, company, category, password });
            supplierToCreate.validate();

            const createdSupplier = await this.createSupplierUseCase.execute(supplierToCreate);

            req.session.supplier = {
                id: createdSupplier.id,
                email: createdSupplier.email
            }
            
            return res.status(201).send(JSON.stringify(createdSupplier));
        } catch(error) {
            return next(error);
        }
    }
}
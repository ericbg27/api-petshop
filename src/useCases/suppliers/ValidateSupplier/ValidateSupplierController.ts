import { Request, Response } from "express";
import { BadRequest } from "../../../errors/BadRequest";
import { Unauthorized } from "../../../errors/Unauthorized";
import { ValidateSupplierUseCase } from "./ValidateSupplierUseCase";

export class ValidateSupplierController {
    constructor(
        private validateSupplierUseCase: ValidateSupplierUseCase
    ) {}

    async handle(req: Request, res: Response, next: any) {
        if(!req.session.supplier) {
            const sessionErr = new Unauthorized('Unauthorized supplier');
            return next(sessionErr); 
        }
        if(!req.params.supplierId) {
            const idErr = new BadRequest("Invalid supplier ID sent in request");
            return next(idErr);
        }

        const supplierId = parseInt(req.params.supplierId);
        // TODO: Check if this makes sense since we have the supplier ID in our session
        const authorized = await this.validateSupplierUseCase.execute(supplierId, req.session.supplier.email);
        if(!authorized) {
            const sessionErr = new Unauthorized('Unauthorized supplier');
            return next(sessionErr);
        }

        return next();
    }
}
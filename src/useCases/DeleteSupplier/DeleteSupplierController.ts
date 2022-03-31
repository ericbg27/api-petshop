import { Request, Response } from 'express'
import { DeleteSupplierUseCase } from "./DeleteSupplierUseCase";

import { BadRequest } from '../../errors/BadRequest';

export class DeleteSupplierController {
    constructor(
        private deleteSupplierUseCase: DeleteSupplierUseCase
    ) {}

    async handle(req: Request, res: Response, next: any): Promise<Response> {
        if(!req.params.supplierId) { // TODO: Maybe have this as a middleware
            const idErr = new BadRequest("Invalid supplier ID sent in request");
            return next(idErr);
        }

        const supplierId = parseInt(req.params.supplierId);

        try {
            await this.deleteSupplierUseCase.execute(supplierId);

            return res.status(204).send();
        } catch(error) {
            return next(error);
        }
    }
};
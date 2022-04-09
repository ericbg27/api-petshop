import { Request, Response } from "express";
import { BadRequest } from "../../../errors/BadRequest";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

export class DeleteProductController {
    constructor(
        private deleteProductUseCase: DeleteProductUseCase
    ) {}

    async handle(req: Request, res: Response, next: any): Promise<Response> {
        if(!req.params.productId) {
            const productIdErr = new BadRequest('Invalid product ID sent in the request');
            return next(productIdErr);
        }

        const productId = parseInt(req.params.productId);

        try {
            await this.deleteProductUseCase.execute(productId);

            return res.status(204).end();
        } catch(error) {
            return next(error);
        }
    }
}
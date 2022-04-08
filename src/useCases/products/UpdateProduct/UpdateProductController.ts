import { Request, Response } from "express";
import { Product } from "../../../entities/Product";
import { BadRequest } from "../../../errors/BadRequest";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

export class UpdateProductController {
    constructor(
        private updateProductUseCase: UpdateProductUseCase
    ) {}

    async handle(req: Request, res: Response, next: any, partial: boolean): Promise<Response> {
        if(!req.params.productId) {
            const productIdErr = new BadRequest("Invalid product ID sent in the request");
            return next(productIdErr);
        }
        if(!req.body.name && !req.body.price && !req.body.quantity && !req.body.description) {
            const noBodyErr = new BadRequest("No data sent in request body");
            return next(noBodyErr);
        }
        if(!req.session.supplier) {
            const noSupplierErr = new BadRequest("Invalid supplier sent in the request");
            return next(noSupplierErr);
        }

        const { name, price, quantity, description } = req.body;
        const productData = {
            supplierId: req.session.supplier.id,
            name: name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            description: description
        }

        try {
            const productId = parseInt(req.params.productId);
            const updatedProduct = await this.updateProductUseCase.execute(productId, productData, partial);

            return res.status(200).send(JSON.stringify(updatedProduct));
        } catch(error) {
            return next(error);
        }
    }
};
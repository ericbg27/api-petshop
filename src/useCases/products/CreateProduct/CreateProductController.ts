import { Request, Response } from "express";
import { Unauthorized } from "../../../errors/Unauthorized";
import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductController {
    constructor(
        private createProductUseCase: CreateProductUseCase
    ) {}

    async handle(req: Request, res: Response, next: any): Promise<Response> {
        const { name, description, price, quantity } = req.body;
        const supplierId = parseInt(req.params.supplierId);

        try {
            const createdProduct = await this.createProductUseCase.execute({
                supplierId,
                name,
                description,
                price,
                quantity
            });

            return res.status(201).send(JSON.stringify(createdProduct))
        } catch(error) {
            return next(error);
        }
    }
}
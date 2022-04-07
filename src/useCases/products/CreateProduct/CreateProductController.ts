import { Request, Response } from "express";
import { Unauthorized } from "../../../errors/Unauthorized";
import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductController {
    constructor(
        private createProductUseCase: CreateProductUseCase
    ) {}

    async handle(req: Request, res: Response, next: any): Promise<Response> {
        const { name, description, price, quantity } = req.body;
        if(!req.session.supplier) {
            throw new Unauthorized('Unauthorized supplier');
        }
        const supplierId = req.session.supplier.id;

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
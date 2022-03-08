import { Request, Response } from "express";
import { CreateSupplierUseCase } from "./CreateSupplierUseCase";

export class CreateSupplierController {
    constructor(
        private createSupplierUseCase: CreateSupplierUseCase
    ) {}

    async handle(req: Request, res: Response, next: any): Promise<Response> {
        const { email, company, category } = req.body;

        try {
            await this.createSupplierUseCase.execute({
                email,
                company, 
                category
            });

            return res.status(201).send();
        } catch(error) {
            return next(error);
        }
    }
}
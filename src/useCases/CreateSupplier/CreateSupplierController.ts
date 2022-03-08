import { Request, Response } from "express";
import { CreateSupplierUseCase } from "./CreateSupplierUseCase";

export class CreateSupplierController {
    constructor(
        private createSupplierUseCase: CreateSupplierUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { email, company, category } = req.body;

        try {
            await this.createSupplierUseCase.execute({
                email,
                company, 
                category
            });

            return res.status(201).send();
        } catch(error) { // TODO: Define error handler middleware to deal with sending errors
            let message = "Unexpected error";
            if(error) {
                message = error.message;
            }

            return res.status(400).json({
                message: message
            });
        }
    }
}
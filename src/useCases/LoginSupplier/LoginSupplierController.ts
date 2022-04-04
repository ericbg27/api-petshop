import { Request, Response } from "express";
import { Supplier } from "../../entities/Supplier";
import { LoginSupplierUseCase } from "./LoginSupplierUseCase";

export class LoginSupplierController {
    constructor (
        private loginSupplierUseCase: LoginSupplierUseCase
    ) {}

    async handle(req: Request, res: Response, next: any): Promise<Response> {
        const { email, password } = req.body;

        let savedSupplier: Supplier;
        try {
            savedSupplier = await this.loginSupplierUseCase.execute(email, password);
            req.session.supplier = savedSupplier.email;
            
            return res.status(200).send();
        } catch(error) {
            return next(error);
        }
    }
}
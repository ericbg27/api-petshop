import { Request, Response } from "express";
import { FindSuppliersUseCase } from "./FindSuppliersUseCase";

export class FindSuppliersController {
    constructor(
        private findSuppliersUseCase: FindSuppliersUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.findSuppliersUseCase.execute();
            
            res.status(200);
            return res.send(JSON.stringify(result));
        } catch(error) {
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
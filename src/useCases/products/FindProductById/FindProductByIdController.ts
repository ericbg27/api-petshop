import { Request, Response } from "express";
import { BadRequest } from "../../../errors/BadRequest";
import { FindProductByIdUseCase } from "./FindProductByIdUseCase";

export class FindProductByIdController {
    constructor(
        private findProductByIdUseCase: FindProductByIdUseCase
    ) {}

    async handle(req: Request, res: Response, next: any): Promise<Response> {
        if(!req.params.productId) {
            const idErr = new BadRequest("Invalid product ID sent in request");
            return next(idErr);
        }
        
        try {
            const productId = parseInt(req.params.productId);
            const result = await this.findProductByIdUseCase.execute(productId);

            return res.status(200).send(JSON.stringify(result));
        } catch(error) {
            return next(error);
        }
    }
};

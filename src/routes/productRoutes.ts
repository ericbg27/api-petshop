import { Router } from "express";
import { createProductController } from "../useCases/products/CreateProduct";
import { validateSupplierController } from "../useCases/suppliers/ValidateSupplier";

const productRouter = Router();

productRouter.post('/create', (req, res, next) => {
        return validateSupplierController.handle(req, res, next);
    }, (req, res, next) => {
        return createProductController.handle(req, res, next);
    }
);

export { productRouter };
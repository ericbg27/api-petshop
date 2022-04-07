import { Router } from "express";
import { createProductController } from "../useCases/products/CreateProduct";
import { findProductByIdController } from "../useCases/products/FindProductById";
import { findProductsForSupplierController } from "../useCases/products/FindProductsForSupplier";
import { validateSupplierController } from "../useCases/suppliers/ValidateSupplier";

const productRouter = Router({ mergeParams: true });

productRouter.get("/", (req, res, next) => {
    return findProductsForSupplierController.handle(req, res, next);
})

productRouter.get('/:productId', (req, res, next) => {
    return findProductByIdController.handle(req, res, next);
});

productRouter.post('/create', (req, res, next) => {
    return validateSupplierController.handle(req, res, next);
}, (req, res, next) => {
    return createProductController.handle(req, res, next);
}
);

export { productRouter };
import { Router } from "express";
import { createSupplierController } from "../useCases/CreateSupplier";
import { findSuppliersController } from "../useCases/FindSuppliers";

const supplierRouter = Router();

supplierRouter.get("/", (req, res, next) => {
    return findSuppliersController.handle(req, res, next);
})

supplierRouter.post('/', (req, res, next) => {
    return createSupplierController.handle(req, res, next);
});

export { supplierRouter };
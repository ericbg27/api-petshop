import { Router } from "express";
import { createSupplierController } from "../useCases/CreateSupplier";
import { findSuppliersController } from "../useCases/FindSuppliers";

const supplierRouter = Router();

supplierRouter.get("/", (req, res) => {
    return findSuppliersController.handle(req, res);
})

supplierRouter.post('/', (req, res) => {
    return createSupplierController.handle(req, res);
});

export { supplierRouter };
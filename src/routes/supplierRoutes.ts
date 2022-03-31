import { Router } from "express";
import { createSupplierController } from "../useCases/CreateSupplier";
import { findSuppliersController } from "../useCases/FindSuppliers";
import { findSupplierByIdController } from "../useCases/FindSupplierById";
import { updateSupplierController } from "../useCases/UpdateSupplier";

const supplierRouter = Router();

supplierRouter.get('/', (req, res, next) => {
    return findSuppliersController.handle(req, res, next);
});

supplierRouter.get('/:supplierId', (req, res, next) => {
    return findSupplierByIdController.handle(req, res, next);
});

supplierRouter.post('/', (req, res, next) => {
    return createSupplierController.handle(req, res, next);
});

supplierRouter.put('/', (req, res, next) => {
    return updateSupplierController.handle(req, res, next, false);
});

supplierRouter.patch('/', (req, res, next) => {
    return updateSupplierController.handle(req, res, next, true);
});

export { supplierRouter };
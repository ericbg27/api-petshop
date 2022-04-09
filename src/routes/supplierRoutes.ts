import { Router } from "express";
import { createSupplierController } from "../useCases/suppliers/CreateSupplier";
import { findSuppliersController } from "../useCases/suppliers/FindSuppliers";
import { findSupplierByIdController } from "../useCases/suppliers/FindSupplierById";
import { updateSupplierController } from "../useCases/suppliers/UpdateSupplier";
import { deleteSupplierController } from "../useCases/suppliers/DeleteSupplier";
import { validateSupplierController } from "../useCases/suppliers/ValidateSupplier";
import { loginSupplierController } from "../useCases/suppliers/LoginSupplier";

const supplierRouter = Router();

supplierRouter.get('/', (req, res, next) => {
    return findSuppliersController.handle(req, res, next);
});

supplierRouter.get('/:supplierId', (req, res, next) => {
    return findSupplierByIdController.handle(req, res, next);
});

supplierRouter.post('/login', (req, res, next) => {
    return loginSupplierController.handle(req, res, next);
});

supplierRouter.post('/register', (req, res, next) => {
    return createSupplierController.handle(req, res, next);
});

supplierRouter.put('/:supplierId', (req, res, next) => {
        return validateSupplierController.handle(req, res, next)
    }, (req, res, next) => {
        return updateSupplierController.handle(req, res, next, false);
    }
);

supplierRouter.patch('/:supplierId', (req, res, next) => {
        return validateSupplierController.handle(req, res, next)
    }, (req, res, next) => {
        return updateSupplierController.handle(req, res, next, true);
    }
);

supplierRouter.delete('/:supplierId', (req, res, next) => {
        return validateSupplierController.handle(req, res, next)
    }, (req, res, next) => {
        return deleteSupplierController.handle(req, res, next);
    }
);

export { supplierRouter };
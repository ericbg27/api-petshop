import { Router } from "express";
import { createSupplierController } from "../useCases/CreateSupplier";
import { findSuppliersController } from "../useCases/FindSuppliers";
import { findSupplierByIdController } from "../useCases/FindSupplierById";
import { updateSupplierController } from "../useCases/UpdateSupplier";
import { deleteSupplierController } from "../useCases/DeleteSupplier";
import { validateSupplierController } from "../useCases/ValidateSupplier";

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
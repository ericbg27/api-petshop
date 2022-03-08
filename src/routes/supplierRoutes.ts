import { Router } from "express";
import { createSupplierController } from "../useCases/CreateSupplier";

const supplierRouter = Router();

supplierRouter.post('/suppliers', (req, res) => {
    return createSupplierController.handle(req, res);
});

export { supplierRouter };
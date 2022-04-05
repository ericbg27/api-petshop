import { MySQLSuppliersRepository } from "../../../repositories/implementations/MySQLSuppliersRepository";
import { CreateSupplierController } from "./CreateSupplierController";
import { CreateSupplierUseCase } from "./CreateSupplierUseCase";

const mySQLSuppliersRepository = new MySQLSuppliersRepository();

const createSupplierUseCase = new CreateSupplierUseCase(
    mySQLSuppliersRepository
);

const createSupplierController = new CreateSupplierController(
    createSupplierUseCase
);

export { createSupplierController };
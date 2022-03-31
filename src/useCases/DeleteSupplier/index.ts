import { MySQLSuppliersRepository } from "../../repositories/implementations/MySQLSuppliersRepository";
import { DeleteSupplierUseCase } from "./DeleteSupplierUseCase";
import { DeleteSupplierController } from "./DeleteSupplierController";

const mySQLSuppliersRepository = new MySQLSuppliersRepository();

const deleteSupplierUseCase = new DeleteSupplierUseCase(mySQLSuppliersRepository);

const deleteSupplierController = new DeleteSupplierController(deleteSupplierUseCase);

export { deleteSupplierController };
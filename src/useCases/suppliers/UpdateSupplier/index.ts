import { MySQLSuppliersRepository } from "../../../repositories/implementations/MySQLSuppliersRepository";
import { UpdateSupplierController } from "./UpdateSupplierController";
import { UpdateSupplierUseCase } from "./UpdateSupplierUseCase";

const mySQLSuppliersRepository = new MySQLSuppliersRepository();

const updateSupplierUseCase = new UpdateSupplierUseCase(mySQLSuppliersRepository);

const updateSupplierController = new UpdateSupplierController(updateSupplierUseCase);

export { updateSupplierController };
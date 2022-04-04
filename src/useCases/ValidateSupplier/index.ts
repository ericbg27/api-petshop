import { MySQLSuppliersRepository } from "../../repositories/implementations/MySQLSuppliersRepository";
import { ValidateSupplierController } from "./ValidateSupplierController";
import { ValidateSupplierUseCase } from "./ValidateSupplierUseCase";

const mySQLSuppliersRepository = new MySQLSuppliersRepository();

const validateSupplierUseCase = new ValidateSupplierUseCase(mySQLSuppliersRepository);

const validateSupplierController = new ValidateSupplierController(validateSupplierUseCase);

export { validateSupplierController };
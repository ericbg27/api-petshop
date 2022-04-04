import { MySQLSuppliersRepository } from "../../repositories/implementations/MySQLSuppliersRepository";
import { LoginSupplierController } from "./LoginSupplierController";
import { LoginSupplierUseCase } from "./LoginSupplierUseCase";

const mySQLSuppliersRepository = new MySQLSuppliersRepository();

const loginSupplierUseCase = new LoginSupplierUseCase(mySQLSuppliersRepository);

const loginSupplierController = new LoginSupplierController(loginSupplierUseCase);

export { loginSupplierController }
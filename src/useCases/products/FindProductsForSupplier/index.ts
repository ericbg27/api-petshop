import { MySQLProductsRepository } from "../../../repositories/implementations/MySQLProductsRepository";
import { FindProductForSupplierController } from "./FindProductsForSupplierController";
import { FindProductsForSupplierUseCase } from "./FindProductsForSupplierUseCase";

const mySQLProductsRepository = new MySQLProductsRepository();

const findProductsForSupplierUseCase = new FindProductsForSupplierUseCase(mySQLProductsRepository);

const findProductsForSupplierController = new FindProductForSupplierController(findProductsForSupplierUseCase);

export { findProductsForSupplierController };
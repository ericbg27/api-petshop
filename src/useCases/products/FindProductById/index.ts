import { MySQLProductsRepository } from "../../../repositories/implementations/MySQLProductsRepository";
import { FindProductByIdController } from "./FindProductByIdController";
import { FindProductByIdUseCase } from "./FindProductByIdUseCase";

const mySQLProductsRepository = new MySQLProductsRepository();

const findProductByIdUseCase = new FindProductByIdUseCase(mySQLProductsRepository);

const findProductByIdController = new FindProductByIdController(findProductByIdUseCase);

export { findProductByIdController };
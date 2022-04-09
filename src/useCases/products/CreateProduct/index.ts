import { MySQLProductsRepository } from "../../../repositories/implementations/MySQLProductsRepository";
import { CreateProductUseCase } from "./CreateProductUseCase";
import { CreateProductController } from "./CreateProductController";

const mySQLProductsRepository = new MySQLProductsRepository();

const createProductUseCase = new CreateProductUseCase(mySQLProductsRepository);

const createProductController = new CreateProductController(createProductUseCase);

export { createProductController };
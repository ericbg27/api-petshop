import { MySQLProductsRepository } from "../../../repositories/implementations/MySQLProductsRepository";
import { UpdateProductController } from "./UpdateProductController";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

const mySQLProductsRepository = new MySQLProductsRepository();

const updateProductUseCase = new UpdateProductUseCase(mySQLProductsRepository);

const updateProductController = new UpdateProductController(updateProductUseCase);

export { updateProductController };
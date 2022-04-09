import { MySQLProductsRepository } from "../../../repositories/implementations/MySQLProductsRepository";
import { DeleteProductController } from "./DeleteProductController";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

const mySQLProductsRepository = new MySQLProductsRepository();

const deleteProductUseCase = new DeleteProductUseCase(mySQLProductsRepository);

const deleteProductController = new DeleteProductController(deleteProductUseCase);

export { deleteProductController }
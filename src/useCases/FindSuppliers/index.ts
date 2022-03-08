import { MySQLSuppliersRepository } from "../../repositories/implementations/MySQLSuppliersRepository";
import { FindSuppliersController } from "./FindSuppliersController";
import { FindSuppliersUseCase } from "./FindSuppliersUseCase";

const mySQLSuppliersRepository = new MySQLSuppliersRepository();

const findSuppliersUseCase = new FindSuppliersUseCase(mySQLSuppliersRepository);

const findSuppliersController = new FindSuppliersController(findSuppliersUseCase);

export { findSuppliersController };
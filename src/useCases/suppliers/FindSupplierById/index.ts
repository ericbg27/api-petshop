import { MySQLSuppliersRepository } from "../../../repositories/implementations/MySQLSuppliersRepository";
import { FindSupplierByIdUseCase } from "./FindSupplierByIdUseCase";
import { FindSupplierByIdController } from "./FindSupplierByIdController";

const mySQLSuppliersRepository = new MySQLSuppliersRepository();

const findSupplierByIdUseCase = new FindSupplierByIdUseCase(mySQLSuppliersRepository);

const findSupplierByIdController = new FindSupplierByIdController(findSupplierByIdUseCase);

export { findSupplierByIdController }
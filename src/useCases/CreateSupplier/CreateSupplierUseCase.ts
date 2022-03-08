import { Supplier } from "../../entities/Supplier";
import { ISuppliersRepository } from "../../repositories/ISuppliersRepository";
import { ICreateSupplierRequestDTO } from "./CreateUserUseCaseDTO";

export class CreateSupplierUseCase {
    constructor(
        private suppliersRepository: ISuppliersRepository
    ) {}

    async execute(requestData: ICreateSupplierRequestDTO) {
        const supplierExists = await this.suppliersRepository.findByEmail(requestData.email);

        if(supplierExists) {
            throw new Error("Supplier already exists")
        }

        const supplier = new Supplier(requestData);
        supplier.validate();
        
        await this.suppliersRepository.create(supplier); // TODO: Get newly created Supplier and return it
    }
}
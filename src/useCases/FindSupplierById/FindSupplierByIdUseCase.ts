import { Supplier } from "../../entities/Supplier";
import { ISuppliersRepository } from "../../repositories/ISuppliersRepository";

export class FindSupplierByIdUseCase {
    constructor(
        private suppliersRepository: ISuppliersRepository
    ) {}

    async execute(supplierId: number) {
        return this.suppliersRepository.findById(supplierId);
    }
};
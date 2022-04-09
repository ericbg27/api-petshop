import { NotFound } from "../../../errors/NotFound";
import { ISuppliersRepository } from "../../../repositories/ISuppliersRepository";

export class ValidateSupplierUseCase {
    constructor(
        private suppliersRepository : ISuppliersRepository
    ) {}

    async execute(supplierId: number, supplierEmail: string): Promise<boolean> {
        const savedSupplier = await this.suppliersRepository.findByEmail(supplierEmail);
        if(!savedSupplier) {
            throw new NotFound(`Supplier was not found in database`);
        }

        if(savedSupplier.id !== supplierId) {
            return false;
        }

        return true;
    }
}
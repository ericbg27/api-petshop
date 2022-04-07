import { Supplier } from "../../../entities/Supplier";
import { NotFound } from "../../../errors/NotFound";
import { ISuppliersRepository } from "../../../repositories/ISuppliersRepository";

export class FindSupplierByIdUseCase {
    constructor(
        private suppliersRepository: ISuppliersRepository
    ) {}

    async execute(supplierId: number): Promise<Supplier> {
        const savedSupplier = await this.suppliersRepository.findById(supplierId);
        if(!savedSupplier) {
            throw new NotFound(`A supplier with ID ${supplierId} was not found`);
        }

        return savedSupplier;
    }
};
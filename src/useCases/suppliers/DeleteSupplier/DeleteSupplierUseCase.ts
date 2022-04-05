import { ISuppliersRepository } from "../../../repositories/ISuppliersRepository";

import { NotFound } from "../../../errors/NotFound";

export class DeleteSupplierUseCase {
    constructor(
        private suppliersRepository: ISuppliersRepository
    ) {}

    async execute(supplierId: number): Promise<void> {
        const savedUser = await this.suppliersRepository.findById(supplierId);
        if(!savedUser) {
            throw new NotFound(`Supplier with ID ${supplierId} was not found in database`);
        }

        return this.suppliersRepository.delete(supplierId);
    }
}
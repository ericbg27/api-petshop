import { NotFound } from "../../errors/NotFound";
import { ISuppliersRepository } from "../../repositories/ISuppliersRepository";

export class ValidateSupplierUseCase {
    constructor(
        private suppliersRepository : ISuppliersRepository
    ) {}

    async execute(supplierId: number, supplierEmail: string): Promise<boolean> {
        const savedSupplier = await this.suppliersRepository.findByEmail(supplierEmail);
        if(!savedSupplier) {
            throw new NotFound(`Supplier with ID ${supplierId} was not found in database`);
        }

        return new Promise((resolve, reject) => {
            if(savedSupplier.id === supplierId) {
                resolve(true);
                return;
            }

            reject(false);
            return;
        })
    }
}
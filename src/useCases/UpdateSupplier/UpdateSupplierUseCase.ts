import { Supplier } from "../../entities/Supplier";
import { NotFound } from "../../errors/NotFound";
import { ISuppliersRepository } from "../../repositories/ISuppliersRepository";
import { IUpdateSupplierDTO } from "./UpdateSupplierUseCaseDTO";

export class UpdateSupplierUseCase {
    constructor(
        private suppliersRepository: ISuppliersRepository
    ) {}

    async exec(id: number, data: IUpdateSupplierDTO): Promise<void> {
        const savedUser = await this.suppliersRepository.findById(id);
        if(!savedUser) {
            throw new NotFound(`Supplier with ID ${id} was not found in database`);
        }

        let userData = new Supplier({
            email: data.email,
            company: data.company,
            category: data.category
        });
        userData.validate(data.partial);

        return this.suppliersRepository.update(id, userData);
    }
};
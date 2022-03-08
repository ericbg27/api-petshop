import { Supplier } from "../../entities/Supplier";
import { ISuppliersRepository } from "../../repositories/ISuppliersRepository";

export class FindSuppliersUseCase {
    constructor(
        private suppliersRepository: ISuppliersRepository
    ) {}

    async execute(): Promise<Supplier[]> {
        return this.suppliersRepository.findAll();
    }
}
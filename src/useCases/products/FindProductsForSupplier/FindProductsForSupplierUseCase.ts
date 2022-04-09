import { Product } from "../../../entities/Product";
import { IProductsRepository } from "../../../repositories/IProductsRepository";

export class FindProductsForSupplierUseCase {
    constructor(
        private productsRepository: IProductsRepository
    ) {}

    async execute(supplierId: number): Promise<Product[]> {
        return await this.productsRepository.findAllForSupplier(supplierId);
    }
};
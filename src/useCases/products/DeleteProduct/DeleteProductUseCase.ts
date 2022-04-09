import { IProductsRepository } from "../../../repositories/IProductsRepository";

export class DeleteProductUseCase {
    constructor(
        private productsRepository: IProductsRepository
    ) {}

    async execute(productId: number): Promise<void> {
        return this.productsRepository.delete(productId);
    }
};
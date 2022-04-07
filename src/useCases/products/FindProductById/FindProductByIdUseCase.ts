import { Product } from "../../../entities/Product";
import { NotFound } from "../../../errors/NotFound";
import { IProductsRepository } from "../../../repositories/IProductsRepository";

export class FindProductByIdUseCase {
    constructor(
        private productsRepository: IProductsRepository
    ) {}

    async execute(productId: number): Promise<Product> {
        const savedProduct = await this.productsRepository.findById(productId);
        if(!savedProduct) {
            throw new NotFound(`A product with ID ${productId} was not found in the database`);
        }

        return savedProduct;
    }
};

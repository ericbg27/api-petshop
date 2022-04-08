import { Product } from "../../../entities/Product";
import { NotFound } from "../../../errors/NotFound";
import { IProductsRepository } from "../../../repositories/IProductsRepository";
import { UpdateProductUseCaseDTO } from "./UpdateProductUseCaseDTO";

export class UpdateProductUseCase {
    constructor(
        private productsRepository: IProductsRepository
    ) {}

    async execute(productId: number, productData: UpdateProductUseCaseDTO, partial: boolean): Promise<Product> {
        const productToUpdate = new Product(productData);
        productToUpdate.validate(partial);

        const productInDatabase = this.productsRepository.findById(productId);
        if(!productInDatabase) {
            throw new NotFound(`Product with ID ${productId} was not found in the database`);
        }
        
        return this.productsRepository.update(productId, productToUpdate);
    }
}
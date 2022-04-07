import { Product } from "../../../entities/Product";
import { AlreadyExists } from "../../../errors/AlreadyExists";
import { IProductsRepository } from "../../../repositories/IProductsRepository";
import { ProductModel } from "../../../repositories/models/ProductModel";
import { ICreateProducUseCasetDTO } from "./CreateProductUseCaseDTO";

export class CreateProductUseCase {
    constructor (
        private productsRepository : IProductsRepository
    ) {}

    async execute(productData: ICreateProducUseCasetDTO): Promise<Product> {
        const productExists = await this.productsRepository.findByName(productData.name, productData.supplierId);
        if(productExists) {
            throw new AlreadyExists("product");
        }

        const productToCreate = new Product(productData);
        
        let newProduct: Product;
        try {
            newProduct = await this.productsRepository.create(productToCreate);
        } catch(error) {
            throw error;
        }

        return newProduct;
    }
}
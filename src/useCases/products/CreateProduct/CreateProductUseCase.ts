import { Product } from "../../../entities/Product";
import { AlreadyExists } from "../../../errors/AlreadyExists";
import { FailedOp } from "../../../errors/FailedOp";
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
        productToCreate.validate(false);
        
        const newProductId = await this.productsRepository.create(productToCreate);
        
        try {
            const savedProduct = await this.productsRepository.findById(newProductId);
            if(!savedProduct) {
                throw new FailedOp('create', 'product');
            }

            return new Product(savedProduct);
        } catch(error) {
            throw error;
        }
    }
}
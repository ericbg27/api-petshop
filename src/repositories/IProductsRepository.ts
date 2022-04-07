import { Product } from "../entities/Product";

export interface IProductsRepository {
    create(product: Product): Promise<Product>;
    findById(productId: number): Promise<Product | undefined>;
    findByName(productName: string, supplierId?: number): Promise<Product | undefined>;
};
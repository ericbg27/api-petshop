import { Product } from "../entities/Product";

export interface IProductsRepository {
    create(product: Product): Promise<number>;
    findById(productId: number): Promise<Product | undefined>;
    findByName(productName: string, supplierId?: number): Promise<Product | undefined>;
    findAllForSupplier(supplierId: number): Promise<Product[]>;
    update(productId: number, data: Product): Promise<Product>;
    delete(productId: number): Promise<void>;
};
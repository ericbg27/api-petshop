import { Product } from "../../entities/Product";
import { IProductsRepository } from "../IProductsRepository";
import { ProductModel } from "../models/ProductModel";

export class MySQLProductsRepository implements IProductsRepository {
    async create(product: Product): Promise<Product> {
        const queryResult = await ProductModel.create(product, { raw: true });
                
        return new Promise((resolve, reject) => {
            if(!queryResult) {
                reject(new Error("Failed to create product"));
                return;
            }

            resolve(new Product(queryResult));
        });
    }
    
    async findById(productId: number): Promise<Product | undefined> {
        const queryResult = await ProductModel.findOne({
            where: { 
                id: productId 
            },
            raw: true
        });

        return new Promise((resolve) => {
            if(!queryResult) {
                resolve(undefined);
                return;
            }

            resolve(new Product(queryResult));
        });
    }

    async findByName(productName: string): Promise<Product | undefined> {
        const queryResult = await ProductModel.findOne({
            where: { 
                name: productName
            },
            raw: true
        });

        return new Promise((resolve) => {
            if(!queryResult) {
                resolve(undefined);
                return;
            }

            resolve(new Product(queryResult));
        });
    }
}
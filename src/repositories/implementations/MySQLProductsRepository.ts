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

    async findByName(productName: string, supplierId?: number): Promise<Product | undefined> {
        let whereClauses = {
            name: productName
        }
        if(supplierId) {
            Object.assign(whereClauses, { supplierId: supplierId });
        }
        const queryResult = await ProductModel.findOne({
            where: whereClauses,
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

    async findAllForSupplier(supplierId: number): Promise<Product[]> {
        const queryResult = await ProductModel.findAll({
            where: {
                supplierId: supplierId
            },
            raw: true 
        });
        
        let productsFound: Product[] = [];
        if(queryResult.length > 0) {
            for(let product of queryResult) {
                productsFound.push(new Product(product));
            }
        }

        return new Promise((resolve) => {
            resolve(productsFound);
        });
    }
}
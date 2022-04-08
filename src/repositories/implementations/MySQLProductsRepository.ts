import { Product } from "../../entities/Product";
import { FailedOp } from "../../errors/FailedOp";
import { IProductsRepository } from "../IProductsRepository";
import { ProductModel } from "../models/ProductModel";

export class MySQLProductsRepository implements IProductsRepository {
    async create(product: Product): Promise<number> {
        const queryResult = await ProductModel.create(product);
                
        return new Promise((resolve, reject) => {
            if(!queryResult) {
                reject(new Error("Failed to create product"));
                return;
            }

            resolve(queryResult.id);
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
    
    async update(productId: number, data: Product): Promise<Product> {
        try {
            const queryResult = await ProductModel.update(
                data,
                {
                    where: {
                        id: productId
                    }
                }
            );

            if(queryResult[0] === 0) {
                throw new Error();
            }

            const updatedProduct = await ProductModel.findOne({ 
                where: { 
                    id: productId 
                },
                raw: true
            });
            if(!updatedProduct) {
                throw new Error();
            }

            return new Product(updatedProduct);
        } catch(error) {
            throw new FailedOp("update", "product");
        }
    }
}
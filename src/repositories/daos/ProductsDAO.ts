import { Product } from "../../entities/Product";
import { ProductModel } from "../models/ProductModel";

export class ProductsDAO {
    static async create(product: Product): Promise<number> {
        const queryResult = await ProductModel.create(product);

        return queryResult.id;
    }

    static async findOne(queryOptions: { [key: string]: any }): Promise<ProductModel | null> {
        return await ProductModel.findOne(queryOptions);
    }

    static async findAll(queryOptions: { [key: string]: any }): Promise<ProductModel[]> {
        return await ProductModel.findAll(queryOptions);
    }

    static async update(productData: Product, whereClause: { [key: string]: any }): Promise<number> {
        const queryResult = await ProductModel.update(
            productData,
            {
                where: whereClause
            }
        );
        
        return queryResult[0];
    }

    static async delete(queryOptions: { [key: string]: any }): Promise<number> {
        return await ProductModel.destroy(queryOptions);
    }
};
import { Product } from "../../entities/Product";
import { FailedOp } from "../../errors/FailedOp";
import { ProductsDAO } from "../daos/ProductsDAO";
import { IProductsRepository } from "../IProductsRepository";
import { ProductModel } from "../models/ProductModel";

export class MySQLProductsRepository implements IProductsRepository {
    async create(product: Product): Promise<number> {
        let productId: number = -1;
        try {
            productId = await ProductsDAO.create(product);
        } catch(_) {
            throw new FailedOp('create', 'product');
        }
                
        return productId;
    }
    
    async findById(productId: number): Promise<Product | undefined> {
        let product: ProductModel | null = null;
        try {
            product = await ProductsDAO.findOne({
                where: {
                    id: productId
                }
            });
        } catch(_) {
            throw new FailedOp('findById', 'product');
        }

        if(!product) {
            return undefined;
        }

        return new Product(product.get({ plain: true }));
    }

    async findByName(productName: string, supplierId?: number): Promise<Product | undefined> {
        let whereClauses = {
            name: productName
        }
        if(supplierId) {
            Object.assign(whereClauses, { supplierId: supplierId });
        }

        let product: ProductModel | null = null;
        try {
            product = await ProductsDAO.findOne({
                where: whereClauses
            });
        } catch(_) {
            throw new FailedOp('findByName', 'product');
        }

        if(!product) {
            return undefined;
        }

        return new Product(product.get({ plain: true }));
    }

    async findAllForSupplier(supplierId: number): Promise<Product[]> {
        let products: ProductModel[] = [];
        try {
            products = await ProductsDAO.findAll({
                where: {
                    supplierId: supplierId
                }
            });
        } catch(_) {
            throw new FailedOp('findAll', 'product');
        }
        
        let productsFound: Product[] = [];
        if(products.length > 0) {
            for(let product of products) {
                productsFound.push(new Product(product.get({ plain: true })));
            }
        }

        return productsFound;
    }
    
    async update(productId: number, data: Product): Promise<Product> {
        let productsUpdated: number = 0;
        try {
            productsUpdated = await ProductsDAO.update(data, { id: productId });

            if(productsUpdated === 0) {
                throw new Error();
            }
        } catch(_) {
            throw new FailedOp('update', 'product');
        }

        let updatedProduct: ProductModel | null;
        try {
            updatedProduct = await ProductsDAO.findOne({ 
                where: { 
                    id: productId 
                }
            });
        } catch(_) {
            updatedProduct = null;
        }

        if(!updatedProduct) {
            return new Product({
                name: "",
                price: 0,
                quantity: 0,
                description: "",
                supplierId: 0
            });
        }

        return new Product(updatedProduct.get({ plain: true }));
    }

    async delete(productId: number): Promise<void> {
        let productsDeleted: number = 0
        try {
            productsDeleted = await ProductsDAO.delete({
                where: {
                    id: productId
                }
            });

            if(productsDeleted === 0) {
                throw new Error();
            }
        } catch(_) {
            throw new FailedOp('delete', 'product');
        }

        return;
    }
}
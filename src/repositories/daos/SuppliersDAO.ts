import { Supplier } from "../../entities/Supplier";
import { SupplierModel } from "../models/SupplierModel";

export class SuppliersDAO {
    static async create(supplier: Supplier): Promise<number> {
        const createdSupplier = await SupplierModel.create(supplier);
        
        return createdSupplier.id;
    }

    static async findAll(): Promise<SupplierModel[]> {
        return await SupplierModel.findAll();
    }

    static async findOne(queryOptions: { [key: string]: any }): Promise<SupplierModel | null> {
        return await SupplierModel.findOne(queryOptions);
    }

    static async update(supplierData: Supplier, whereClause: { [key: string]: any }): Promise<void> {
        const affectedRows = await SupplierModel.update(
            supplierData,
            {
                where: whereClause
            }
        );

        if(affectedRows[0] === 0) {
            throw new Error('No rows affected by update statement');
        }

        return;
    }

    static async delete(queryOptions: { [key: string]: any }): Promise<void> {
        const affectedRows = await SupplierModel.destroy(queryOptions);

        if(affectedRows === 0) {
            throw new Error('No rows affected by delete statement');
        }
    }
}
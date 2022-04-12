import { Supplier } from "../../entities/Supplier";
import { SupplierModel } from "../models/SupplierModel";

export class SuppliersDAO {
    static async create(supplier: Supplier): Promise<void> {
        await SupplierModel.create(supplier);
        
        return;
    }

    static async findAll(): Promise<SupplierModel[]> {
        return await SupplierModel.findAll({ raw: true });
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

    }

    static async delete(queryOptions: { [key: string]: any }): Promise<void> {
        const affectedRows = await SupplierModel.destroy(queryOptions);

        if(affectedRows === 0) {
            throw new Error('No rows affected by delete statement');
        }
    }
}
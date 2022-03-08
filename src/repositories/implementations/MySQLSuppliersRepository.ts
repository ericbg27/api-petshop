import { Supplier } from "../../entities/Supplier";
import { FailedOp } from "../../errors/FailedOp";
import { ISuppliersRepository } from "../ISuppliersRepository";
import { SupplierModel } from "../models/SupplierModel";

export class MySQLSuppliersRepository implements ISuppliersRepository {
    async create(supplier: Supplier): Promise<Supplier> {
        const queryResult = await SupplierModel.create(supplier, { raw: true });
                
        return new Promise((resolve, reject) => {
            if(!queryResult) {
                reject(new Error("Failed to create supplier"));
                return;
            }

            resolve(new Supplier(queryResult));
        });
    }

    async findAll(): Promise<Supplier[]> {
        const queryResult = await SupplierModel.findAll({ raw: true });
        
        let suppliersFound: Supplier[] = [];
        if(queryResult.length > 0) {
            for(let supplier of queryResult) {
                suppliersFound.push(new Supplier(supplier));
            }
        }

        return new Promise((resolve) => {
            resolve(suppliersFound);
        });
    }

    async findById(id: string): Promise<Supplier | undefined> {
        const queryResult = await SupplierModel.findOne({
            where: {
                id: id
            },
            raw: true
        });

        return new Promise((resolve) => {
            if(!queryResult) {
                resolve(undefined);
                return;
            }

            resolve(new Supplier(queryResult));
        });
    }

    async findByEmail(email: string): Promise<Supplier | undefined> {
        const queryResult = await SupplierModel.findOne({
            where: {
                email: email
            },
            raw: true
        });

        return new Promise((resolve) => {
            if(!queryResult) {
                resolve(undefined);
                return;
            }

            resolve(new Supplier(queryResult));
        });
    }

    async update(id: string, data: Supplier): Promise<void> {
        try {
            await SupplierModel.update(
                data,
                {
                    where: { id: id }
                }
            );
        } catch(error) {
            throw new FailedOp("update", "supplier");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await SupplierModel.destroy(
                {
                    where: { id: id }
                }
            );
        } catch(error) {
            throw new FailedOp("delete", "supplier");
        }
    }
}
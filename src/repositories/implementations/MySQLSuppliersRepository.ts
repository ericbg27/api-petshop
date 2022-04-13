import { Supplier } from "../../entities/Supplier";
import { FailedOp } from "../../errors/FailedOp";
import { SuppliersDAO } from "../daos/SuppliersDAO";
import { ISuppliersRepository } from "../ISuppliersRepository";

export class MySQLSuppliersRepository implements ISuppliersRepository {
    async create(supplier: Supplier): Promise<void> {
        try {
            await SuppliersDAO.create(supplier);
        } catch(_) {
            throw new FailedOp('create', 'supplier');
        }
    }

    async findAll(): Promise<Supplier[]> {
        try {
            const queryResult = await SuppliersDAO.findAll();

            let suppliersFound: Supplier[] = [];
            if(queryResult.length > 0) {
                for(let supplier of queryResult) {
                    suppliersFound.push(
                        new Supplier(supplier.get({ plain: true }))
                    );
                }
            }
            
            return suppliersFound;
        } catch(_) {
            throw new FailedOp('findAll', 'supplier');
        }
    }

    async findById(id: number): Promise<Supplier | undefined> {
        try {
            const queryResult = await SuppliersDAO.findOne({
                where: { id: id }
            });

            if(!queryResult) {
                return undefined;
            }

            return new Supplier(queryResult.get({ plain: true }));
        } catch(_) {
            throw new FailedOp('findById', 'supplier');
        }
    }

    async findByEmail(email: string): Promise<Supplier | undefined> {
        try {
            const queryResult = await SuppliersDAO.findOne({
                where: {
                    email: email
                },
                raw: true
            });

            if(!queryResult) {
                return undefined;
            }

            return new Supplier(queryResult.get({ plain: true }));
        } catch(_) {
            throw new FailedOp('findByEmail', 'supplier');
        }
    }

    async update(id: number, data: Supplier): Promise<void> {
        try {
            return await SuppliersDAO.update(
                data,
                { id: id }
            );
        } catch(_) {
            throw new FailedOp('update', 'supplier');
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await SuppliersDAO.delete({
                where: { 
                    id: id
                }
            });
        } catch(_) {
            throw new FailedOp('delete', 'supplier');
        }
    }
}
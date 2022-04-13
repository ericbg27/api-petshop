import { Supplier } from "../entities/Supplier";

export interface ISuppliersRepository {
    create(supplier: Supplier): Promise<number>;
    findAll(): Promise<Supplier[]>;
    findById(id: number): Promise<Supplier | undefined>;
    findByEmail(email: string): Promise<Supplier | undefined>;
    update(id: number, data: Supplier): Promise<Supplier>;
    delete(id: number): Promise<void>;
}
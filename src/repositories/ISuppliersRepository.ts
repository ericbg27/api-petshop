import { Supplier } from "../entities/Supplier";

export interface ISuppliersRepository {
    create(supplier: Supplier): Promise<Supplier>;
    findAll(): Promise<Supplier[]>;
    findById(id: number): Promise<Supplier | undefined>;
    findByEmail(email: string): Promise<Supplier | undefined>;
    update(id: number, data: Supplier): Promise<void>;
    delete(id: number): Promise<void>;
}
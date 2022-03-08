import { Supplier } from "../entities/Supplier";

export interface ISuppliersRepository {
    create(supplier: Supplier): Promise<Supplier>;
    findById(id: string): Promise<Supplier | undefined>;
    findByEmail(email: string): Promise<Supplier | undefined>;
    update(id: string, data: Supplier): Promise<void>;
    delete(id: number): Promise<void>;
}
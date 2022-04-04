import { Supplier } from "../../entities/Supplier";
import { NotFound } from "../../errors/NotFound";
import { Unauthorized } from "../../errors/Unauthorized";
import { MySQLSuppliersRepository } from "../../repositories/implementations/MySQLSuppliersRepository";
import { passwordHasher } from "../../helpers/PasswordHasher";

export class LoginSupplierUseCase {
    constructor (
        private mySQLSuppliersRepository: MySQLSuppliersRepository
    ) {}

    async execute(supplierEmail: string, supplierPassword: string): Promise<Supplier> {
        const savedSupplier = await this.mySQLSuppliersRepository.findByEmail(supplierEmail);
        if(!savedSupplier) {
            throw new NotFound(`Supplier with email ${supplierEmail} not found in database`);
        }

        supplierPassword = passwordHasher.hash(supplierPassword);
        if(savedSupplier.password !== supplierPassword) {
            throw new Unauthorized(`Wrong password for supplier with email ${supplierEmail}`);
        }

        savedSupplier.password = '';

        return savedSupplier;
    }
}
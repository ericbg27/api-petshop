import { Supplier } from "../../entities/Supplier";
import { AlreadyExists } from "../../errors/AlreadyExists";
import { ISuppliersRepository } from "../../repositories/ISuppliersRepository";
import { ICreateSupplierRequestDTO } from "./CreateUserUseCaseDTO";
import { passwordHasher } from "../../helpers/PasswordHasher";

export class CreateSupplierUseCase {
    constructor(
        private suppliersRepository: ISuppliersRepository
    ) {}

    async execute(requestData: ICreateSupplierRequestDTO): Promise<Supplier> {
        const supplierExists = await this.suppliersRepository.findByEmail(requestData.email);

        if(supplierExists) {
            throw new AlreadyExists("Supplier");
        }

        console.log(requestData);

        const hashedPassword = passwordHasher.hash(requestData.password);
        requestData.password = hashedPassword;

        console.log("TESTE")

        const supplier = new Supplier(requestData);
        supplier.validate();
        
        let newSupplier: Supplier;
        try {
            newSupplier = await this.suppliersRepository.create(supplier);
        } catch(error) {
            throw error;
        }

        return newSupplier;
    }
}
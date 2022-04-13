import { Supplier } from "../../../entities/Supplier";
import { AlreadyExists } from "../../../errors/AlreadyExists";
import { ISuppliersRepository } from "../../../repositories/ISuppliersRepository";
import { ICreateSupplierRequestDTO } from "./CreateUserUseCaseDTO";
import { passwordHasher } from "../../../helpers/PasswordHasher";

export class CreateSupplierUseCase {
    constructor(
        private suppliersRepository: ISuppliersRepository
    ) {}

    async execute(requestData: ICreateSupplierRequestDTO): Promise<Supplier | undefined> {
        const supplierExists = await this.suppliersRepository.findByEmail(requestData.email);

        if(supplierExists) {
            throw new AlreadyExists("Supplier");
        }

        const hashedPassword = passwordHasher.hash(requestData.password);
        requestData.password = hashedPassword;

        const supplier = new Supplier(requestData);
        
        let supplierId: number = -1;
        try {
            supplierId = await this.suppliersRepository.create(supplier);
        } catch(error) {
            throw error;
        }

        let newSupplier: Supplier | undefined;
        try {
            newSupplier = await this.suppliersRepository.findById(supplierId);

            return newSupplier;
        } catch(_) {
            return undefined;
        }
    }
}
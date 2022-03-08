import { Category } from "../enums/Category";
import { InvalidInput } from "../errors/InvalidInput";

export class Supplier {
    public readonly id: number;

    public email: string;
    public company: string;
    public category: string;
    public createdAt: Date;
    public updatedAt: Date;
    public version: number;

    constructor(props: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'validate' >, extraProps?: Omit<Supplier, 'email' | 'company' | 'category' | 'validate'>) {
        Object.assign(this, props);

        if(extraProps) {
            Object.assign(this, extraProps);
        }
    }

    validate(): void {
        if(!Object.values(Category).includes(this.category as Category)) {
            throw new InvalidInput("category");
        }

        if(this.company.length === 0) {
            throw new InvalidInput("company name");
        }

        if(this.email.length === 0) {
            throw new InvalidInput("email");
        }
    }
}
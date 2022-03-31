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

    validate(partial: boolean = false): void {
        let needsChecking = {
            category: true,
            company: true,
            email: true
        };
        if(partial) {
            if(!this.category) {
                needsChecking.category = false;
            }
            if(!this.company) {
                needsChecking.company = false;
            }
            if(!this.email) {
                needsChecking.email = false
            }
        } 

        if(!Object.values(Category).includes(this.category as Category) && needsChecking.category) {
            throw new InvalidInput("category");
        }
        
        if(this.company.length === 0 && needsChecking.company) {
            throw new InvalidInput("company name");
        }

        if(this.email.length === 0 && needsChecking.email) {
            throw new InvalidInput("email");
        }
    }
}
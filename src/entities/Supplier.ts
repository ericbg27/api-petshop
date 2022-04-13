import { Category } from "../enums/Category";
import { InvalidInput } from "../errors/InvalidInput";

export class Supplier {
    public readonly id: number;

    public email: string;
    public password: string;
    public company: string;
    public category: string;
    public createdAt: Date;
    public updatedAt: Date;
    public version: number;

    constructor(props: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'validate' >, extraProps?: Omit<Supplier, 'email' | 'company' | 'category' | 'password' | 'validate'>) {
        Object.assign(this, props);

        if(extraProps) {
            Object.assign(this, extraProps);
        }
    }

    validate(partial: boolean = false): void {
        let needsChecking = {
            category: true,
            company: true,
            email: true,
            password: true
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
            if(!this.password) {
                needsChecking.password = false;
            }
        } 

        if(needsChecking.password && this.password.length === 0) {
            throw new InvalidInput("password");
        } else if(needsChecking.password) {
            this.password = this.password.trim();
        }

        if(needsChecking.category && !Object.values(Category).includes(this.category as Category)) {
            throw new InvalidInput("category");
        } else if(needsChecking.category) {
            this.category = this.category.trim();
        }
        
        if(needsChecking.company && this.company.length === 0) {
            throw new InvalidInput("company name");
        } else if(needsChecking.company) {
            this.company = this.company.trim();
        }

        if(needsChecking.email && this.email.length === 0) {
            throw new InvalidInput("email");
        } else if(needsChecking.email) {
            this.email = this.email.trim();
        }
    }
}
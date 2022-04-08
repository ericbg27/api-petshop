import { InvalidInput } from "../errors/InvalidInput";

export class Product {
    public readonly id: number;
    public readonly supplierId: number;

    public name: string;
    public price: number;
    public quantity: number;
    public description: string;
    public createdAt: Date;
    public updatedAt: Date;
    public version: number;

    constructor(props: Omit<Product, 'createdAt' | 'updatedAt' | 'version' | 'id' | 'validate'>, extraProps?: Omit<Product, | 'name' | 'price' | 'quantity' | 'description' | 'validate'>) {
        Object.assign(this, props);

        if(extraProps) {
            Object.assign(this, extraProps);
        }
    }

    validate(partial: boolean): void {
        const needsChecking = {
            name: true,
            price: true,
            quantity: true,
            description: true
        }

        if(partial) {
            if(!this.name) {
                needsChecking.name = false;
            }
            if(!this.price) {
                needsChecking.price = false;
            }
            if(!this.quantity) {
                needsChecking.quantity = false;
            }
            if(!this.description) {
                needsChecking.description = false
            }
        }

        if(needsChecking.name) {
            if(!this.name) {
                throw new InvalidInput("name");
            }

            this.name = this.name.trim();
            if(this.name.length === 0) {
                throw new InvalidInput("name");
            }
        }
        if(needsChecking.price) {
            if(!this.price) {
                throw new InvalidInput("price");
            }

            if(this.price <= 0) {
                throw new InvalidInput("price");
            }
        }
        if(needsChecking.quantity) {
            if(!this.quantity) {
                throw new InvalidInput("quantity");
            }

            if(this.quantity < 0) {
                throw new InvalidInput("quantity");
            }
        }
        if(needsChecking.description) {
            if(!this.description) {
                throw new InvalidInput("description");
            }

            this.description = this.description.trim();
            if(this.description.length === 0) {
                throw new InvalidInput("description");
            }
        }
    }
}
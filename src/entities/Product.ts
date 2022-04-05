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

    constructor(props: Omit<Product, 'createdAt' | 'updatedAt' | 'version' | 'id'>, extraProps?: Omit<Product, | 'name' | 'price' | 'quantity' | 'description'>) {
        Object.assign(this, props);

        if(extraProps) {
            Object.assign(this, extraProps);
        }
    }
}
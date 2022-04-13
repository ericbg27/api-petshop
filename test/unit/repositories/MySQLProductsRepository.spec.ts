import { equal } from "assert";
import { expect } from "chai";
import * as sinon from "sinon";

import { mockModule } from "../helpers/mockModule";

import { Product } from "../../../src/entities/Product";
import { ProductsDAO } from "../../../src/repositories/daos/ProductsDAO";
import { MySQLProductsRepository } from "../../../src/repositories/implementations/MySQLProductsRepository";
import { FailedOp } from "../../../src/errors/FailedOp";
import { ProductModel } from "../../../src/repositories/models/ProductModel";

describe("MySQL Products Repository create tests", function () {
    const methodsToMock = ['create'];

    const mockProductsDAO = mockModule(ProductsDAO, methodsToMock, {
        create: async (product: Product): Promise<number> => {
            return 1;
        }
    });

    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("Should be able to create a supplier", async function () {
        mockProductsDAO(sandbox);
        const mySQLProductsRepository = new MySQLProductsRepository();
        
        const productToCreate = new Product({
            name: "Test",
            price: 10.0,
            quantity: 5,
            description: "A product",
            supplierId: 1
        });

        let error: null | FailedOp = null;
        let productsCreated: number = 0;
        try {
            productsCreated = await mySQLProductsRepository.create(productToCreate);
        } catch(err) {
            error = err;
        }

        expect(error).to.be.null;
        equal(productsCreated, 1);
    });

    it("Should throw a FailedOp error instance when trying to create a product", async function () {
        mockProductsDAO(sandbox, {
            create: async (product: Product): Promise<number> => {
                throw new Error();
            }
        });
        const mySQLProductsRepository = new MySQLProductsRepository();
        
        const productToCreate = new Product({
            name: "Test",
            price: 10.0,
            quantity: 5,
            description: "A product",
            supplierId: 1
        });

        let error: null | FailedOp = null;
        let productsCreated: number = 0;
        try {
            productsCreated = await mySQLProductsRepository.create(productToCreate);
        } catch(err) {
            error = err;
        }

        expect(error).not.to.be.null;
        expect(error).to.be.an.instanceOf(FailedOp);
        equal(productsCreated, 0);
    });
});

describe("MySQL Products Repository find tests", function () {
    const methodsToMock = ['findAll', 'findOne'];

    const mockProductsDAO = mockModule(ProductsDAO, methodsToMock, {
        findAll: async (queryOptions: { [key: string]: any }): Promise<ProductModel[]> => {
            const product1 = new ProductModel({
                name: "Product 1",
                price: 15.0,
                quantity: 10,
                description: "A Product 1",
                supplierId: 1
            });
            const product2 = new ProductModel({
                name: "Product 2",
                price: 15.0,
                quantity: 10,
                description: "A Product 2",
                supplierId: 1
            });

            return [product1, product2];
        },
        findOne: async (queryOptions: { [key: string]: any }): Promise<ProductModel | null> => {
            const product1 = new ProductModel({
                name: "Product 1",
                price: 15.0,
                quantity: 10,
                description: "A Product 1",
                supplierId: 1
            });

            return product1;
        }
    });

    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("Should be able to find a product by ID", async function () {
        mockProductsDAO(sandbox);
        const mySQLProductsRepository = new MySQLProductsRepository();

        let error: FailedOp | null = null;
        let product: Product | undefined = undefined;
        try {
            product = await mySQLProductsRepository.findById(1);
        } catch(err) {
            error = err;
        }

        expect(error).to.be.null;
        
        expect(product).not.to.be.undefined;
        equal(product!.name, "Product 1");
        equal(product!.price, 15.0);
        equal(product!.description, "A Product 1");
        equal(product!.supplierId, 1);
        equal(product!.quantity, 10);
    });

    it("Should be able to find a product by name", async function () {
        mockProductsDAO(sandbox);
        const mySQLProductsRepository = new MySQLProductsRepository();

        let error: FailedOp | null = null;
        let product: Product | undefined = undefined;
        try {
            product = await mySQLProductsRepository.findByName("Product 1");
        } catch(err) {
            error = err;
        }

        expect(error).to.be.null;
        
        expect(product).not.to.be.undefined;
        equal(product!.name, "Product 1");
        equal(product!.price, 15.0);
        equal(product!.description, "A Product 1");
        equal(product!.supplierId, 1);
        equal(product!.quantity, 10);
    });

    it("Should be able to find all products for a given supplier", async function () {
        mockProductsDAO(sandbox);
        const mySQLProductsRepository = new MySQLProductsRepository();

        let error: FailedOp | null = null;
        let product: Product[] = [];
        try {
            product = await mySQLProductsRepository.findAllForSupplier(1);
        } catch(err) {
            error = err;
        }

        expect(error).to.be.null;
        
        equal(product.length, 2);
        equal(product[0].name, "Product 1");
        equal(product[0].price, 15.0);
        equal(product[0].description, "A Product 1");
        equal(product[0].supplierId, 1);
        equal(product[0].quantity, 10);

        equal(product[1].name, "Product 2");
        equal(product[1].price, 15.0);
        equal(product[1].description, "A Product 2");
        equal(product[1].supplierId, 1);
        equal(product[1].quantity, 10);
    });

    it("Should return undefined when trying to find a product by ID", async function () {
        mockProductsDAO(sandbox, {
            findOne: async (queryOptions: { [key: string]: any }): Promise<ProductModel | null> => {
                return null;
            }
        });
        const mySQLProductsRepository = new MySQLProductsRepository();

        let error: FailedOp | null = null;
        let product: Product | undefined = undefined;
        try {
            product = await mySQLProductsRepository.findById(1);
        } catch(err) {
            error = err;
        }

        expect(error).to.be.null;
        expect(product).to.be.undefined;
    });

    it("Should return undefined when trying to find a product by name", async function () {
        mockProductsDAO(sandbox, {
            findOne: async (queryOptions: { [key: string]: any }): Promise<ProductModel | null> => {
                return null;
            }
        });
        const mySQLProductsRepository = new MySQLProductsRepository();

        let error: FailedOp | null = null;
        let product: Product | undefined = undefined;
        try {
            product = await mySQLProductsRepository.findByName("Product");
        } catch(err) {
            error = err;
        }

        expect(error).to.be.null;
        expect(product).to.be.undefined;
    });

    it("Should throw a FailedOp error instance when trying to find a product by ID", async function () {
        mockProductsDAO(sandbox, {
            findOne: async (queryOptions: { [key: string]: any }): Promise<ProductModel | null> => {
                throw new Error();
            }
        });
        const mySQLProductsRepository = new MySQLProductsRepository();

        let error: FailedOp | null = null;
        let product: Product | undefined = undefined;
        try {
            product = await mySQLProductsRepository.findById(1);
        } catch(err) {
            error = err;
        }

        expect(error).not.to.be.null;
        expect(error).to.be.an.instanceOf(FailedOp);

        expect(product).to.be.undefined;
    });

    it("Should throw a FailedOp error instance when trying to find a product by name", async function () {
        mockProductsDAO(sandbox, {
            findOne: async (queryOptions: { [key: string]: any }): Promise<ProductModel | null> => {
                throw new Error();
            }
        });
        const mySQLProductsRepository = new MySQLProductsRepository();

        let error: FailedOp | null = null;
        let product: Product | undefined = undefined;
        try {
            product = await mySQLProductsRepository.findByName("Product");
        } catch(err) {
            error = err;
        }

        expect(error).not.to.be.null;
        expect(error).to.be.an.instanceOf(FailedOp);

        expect(product).to.be.undefined;
    });

    it("Should throw a FailedOp error instance when trying to find all products for supplier", async function () {
        mockProductsDAO(sandbox, {
            findAll: async (whereClauses: { [key: string]: any }): Promise<ProductModel[]> => {
                throw new Error();
            }
        });
        const mySQLProductsRepository = new MySQLProductsRepository();

        let error: FailedOp | null = null;
        let products: Product[] = [];
        try {
            products = await mySQLProductsRepository.findAllForSupplier(1);
        } catch(err) {
            error = err;
        }

        expect(error).not.to.be.null;
        expect(error).to.be.an.instanceOf(FailedOp);

        equal(products.length, 0);
    })
});
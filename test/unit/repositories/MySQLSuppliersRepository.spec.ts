import { equal } from "assert";
import { expect } from "chai";
import * as sinon from "sinon";

import { mockModule } from "../helpers/mockModule";

import { MySQLSuppliersRepository } from "../../../src/repositories/implementations/MySQLSuppliersRepository";
import { Supplier } from "../../../src/entities/Supplier";
import { FailedOp } from "../../../src/errors/FailedOp";
import { SuppliersDAO } from "../../../src/repositories/daos/SuppliersDAO";
import { SupplierModel } from "../../../src/repositories/models/SupplierModel";

describe("MySQL Suppliers Repository create tests", function () {
  const methodsToMock = ['create'];

  const mockSuppliersDAO = mockModule(SuppliersDAO, methodsToMock, {
    create: async (supplier: Supplier): Promise<void> => {
      return;
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
    mockSuppliersDAO(sandbox);
    const mySQLSuppliersRepository = new MySQLSuppliersRepository();
    
    const supplierToCreate = new Supplier({
      company: "Test",
      category: "food",
      email: "test@test.com",
      password: "1234"
    });

    let error: null | FailedOp = null;
    try {
      await mySQLSuppliersRepository.create(supplierToCreate);
    } catch(err) {
      error = err;
    }

    expect(error).to.be.null;
  });

  it("Should throw a FailedOp error instance", async function () {
    mockSuppliersDAO(sandbox, {
      create: async (supplier: Supplier): Promise<void> => {
        throw new Error();
      }
    });
    const mySQLSuppliersRepository = new MySQLSuppliersRepository();
    
    const supplierToCreate = new Supplier({
      company: "Test",
      category: "food",
      email: "test@test.com",
      password: "1234"
    });

    let error: null | FailedOp = null;
    try {
      await mySQLSuppliersRepository.create(supplierToCreate);
    } catch(err) {
      error = err;
    }

    expect(error).not.to.be.null;
    expect(error).to.be.an.instanceOf(FailedOp);
  });
});

describe("MySQL Suppliers Repository find tests", function () {
  const methodsToMock = ['findAll', 'findOne'];

  const mockSuppliersDAO = mockModule(SuppliersDAO, methodsToMock, {
    findAll: async (): Promise<SupplierModel[]> => {
      const supplier1 = new SupplierModel({
        company: "Test Company S.A 1",
        category: "food",
        email: "testcompany1@email.com",
        password: "1234"
      });
      const supplier2 = new SupplierModel({
        company: "Test Company S.A 2",
        category: "food",
        email: "testcompany2@email.com",
        password: "1234"
      });

      return [supplier1, supplier2];
    },
    findOne: async (queryOptions: { [key: string]: any }): Promise<SupplierModel | null> => {
      return new SupplierModel({
        company: "Test Company S.A 1",
        category: "food",
        email: "testcompany1@email.com",
        password: "1234"
      });
    }
  });

  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Should be able to find one supplier by ID", async function () {
    mockSuppliersDAO(sandbox);
    const mySQLSuppliersRepository = new MySQLSuppliersRepository();

    let error: null | FailedOp = null;
    let supplier: Supplier | undefined = undefined;
    try {
      supplier = await mySQLSuppliersRepository.findById(1);
    } catch(err) {
      error = err;
    }

    expect(error).to.be.null;

    expect(supplier).not.to.be.undefined;
    equal(supplier!.company, "Test Company S.A 1");
    equal(supplier!.category, "food");
    equal(supplier!.email, "testcompany1@email.com");
    equal(supplier!.password, "1234");
  });

  it("Should be able to find one supplier by email", async function () {
    mockSuppliersDAO(sandbox);
    const mySQLSuppliersRepository = new MySQLSuppliersRepository();

    let error: null | FailedOp = null;
    let supplier: Supplier | undefined = undefined;
    try {
      supplier = await mySQLSuppliersRepository.findByEmail("testcompany1@email.com");
    } catch(err) {
      error = err;
    }

    expect(error).to.be.null;

    expect(supplier).not.to.be.undefined;
    equal(supplier!.company, "Test Company S.A 1");
    equal(supplier!.category, "food");
    equal(supplier!.email, "testcompany1@email.com");
    equal(supplier!.password, "1234");
  });

  it("Should be able to find all suppliers", async function () {
    mockSuppliersDAO(sandbox);
    const mySQLSuppliersRepository = new MySQLSuppliersRepository();

    let error: null | FailedOp = null;
    let suppliers: Supplier[] = [];
    try {
      suppliers = await mySQLSuppliersRepository.findAll();
    } catch(err) {
      error = err;
    }

    expect(error).to.be.null;

    equal(suppliers.length, 2);

    equal(suppliers[0].company, "Test Company S.A 1");
    equal(suppliers[0].category, "food");
    equal(suppliers[0].email, "testcompany1@email.com");
    equal(suppliers[0].password, "1234");

    equal(suppliers[1].company, "Test Company S.A 2");
    equal(suppliers[1].category, "food");
    equal(suppliers[1].email, "testcompany2@email.com");
    equal(suppliers[1].password, "1234");
  });

  it("Should return undefined when trying to find one supplier by ID", async function() {
    mockSuppliersDAO(sandbox, {
      findOne: async (queryOptions: { [key: string]: any }): Promise<SupplierModel | null> => {
        return null;
      }
    });
    const mySQLSuppliersRepository = new MySQLSuppliersRepository();
  
    let error: null | FailedOp = null;
    let supplier: Supplier | undefined = undefined;
    try {
      supplier = await mySQLSuppliersRepository.findById(1);
    } catch(err) {
      error = err;
    }

    expect(error).to.be.null;

    expect(supplier).to.be.undefined;
  });

  it("Should throw a FailedOp error instance when trying to find one supplier by ID", async function() {
    mockSuppliersDAO(sandbox, {
      findOne: async (queryOptions: { [key: string]: any }): Promise<SupplierModel | null> => {
        throw Error();
      }
    });
    const mySQLSuppliersRepository = new MySQLSuppliersRepository();

    let error: null | FailedOp = null;
    try {
      await mySQLSuppliersRepository.findById(1);
    } catch(err) {
      error = err;
    }

    expect(error).not.to.be.null;
    expect(error).to.be.an.instanceOf(FailedOp);
  });

  it("Should return undefined when trying to find one supplier by email", async function() {
    mockSuppliersDAO(sandbox, {
      findOne: async (queryOptions: { [key: string]: any }): Promise<SupplierModel | null> => {
        return null;
      }
    });
    const mySQLSuppliersRepository = new MySQLSuppliersRepository();
  
    let error: null | FailedOp = null;
    let supplier: Supplier | undefined = undefined;
    try {
      supplier = await mySQLSuppliersRepository.findByEmail("testcompany1@email.com");
    } catch(err) {
      error = err;
    }

    expect(error).to.be.null;

    expect(supplier).to.be.undefined;
  });

  it("Should throw a FailedOp error instance when trying to find one supplier by email", async function() {
    mockSuppliersDAO(sandbox, {
      findOne: async (queryOptions: { [key: string]: any }): Promise<SupplierModel | null> => {
        throw new Error();
      }
    });
    const mySQLSuppliersRepository = new MySQLSuppliersRepository();
  
    let error: null | FailedOp = null;
    try {
      await mySQLSuppliersRepository.findByEmail("testcompany1@email.com");
    } catch(err) {
      error = err;
    }

    expect(error).not.to.be.null;
    expect(error).to.be.an.instanceOf(FailedOp);
  });

  it("Should throw a FailedOp error instance when trying to find all suppliers", async function() {
    mockSuppliersDAO(sandbox, {
      findAll: async (): Promise<SupplierModel[]> => {
        throw Error();
      }
    });
    const mySQLSuppliersRepository = new MySQLSuppliersRepository();
  
    let error: null | FailedOp = null;
    try {
      await mySQLSuppliersRepository.findAll();
    } catch(err) {
      error = err;
    }

    expect(error).not.to.be.null;
    expect(error).to.be.an.instanceOf(FailedOp);
  });
});

describe("MySQL Suppliers Repository update tests", function () {
  const methodsToMock = ['update'];

  const mockSuppliersDAO = mockModule(SuppliersDAO, methodsToMock, {
    update: async (supplierData: Supplier, whereClause: { [key: string]: any }): Promise<void> => {
      return;
    }
  });

  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Should be able to update a supplier", async function () {
    mockSuppliersDAO(sandbox);
    const mySQLSuppliersRepository = new MySQLSuppliersRepository();

    let error: null | FailedOp = null;
    try {
      await mySQLSuppliersRepository.update(1, 
        new Supplier({
          company: "",
          category: "",
          password: "",
          email: ""
        })
      );
    } catch(err) {
      error = err;
    }

    expect(error).to.be.null;
  });

  it("Should throw a FailedOp error instance when trying to update a supplier", async function () {
    mockSuppliersDAO(sandbox, {
      update: async (supplierData: Supplier, whereClause: { [key: string]: any }): Promise<void> => {
        throw new Error();
      }
    });
    const mySQLSuppliersRepository = new MySQLSuppliersRepository();

    let error: null | FailedOp = null;
    try {
      await mySQLSuppliersRepository.update(1, 
        new Supplier({
          company: "",
          category: "",
          password: "",
          email: ""
        })
      );
    } catch(err) {
      error = err;
    }

    expect(error).not.to.be.null;
    expect(error).to.be.instanceOf(FailedOp);
  });
});

describe("MySQL Suppliers Repository delete tests", function () {
  const methodsToMock = ['delete'];

  const mockSuppliersDAO = mockModule(SuppliersDAO, methodsToMock, {
    delete: async (whereClause: { [key: string]: any }): Promise<void> => {
      return;
    }
  });

  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Should be able to delete a supplier", async function () {
    mockSuppliersDAO(sandbox);
    const mySQLSuppliersRepository = new MySQLSuppliersRepository();

    let error: null | FailedOp = null;
    try {
      await mySQLSuppliersRepository.delete(1);
    } catch(err) {
      error = err;
    }

    expect(error).to.be.null;
  });

  it("Should throw an instance of FailedOp error when trying to delete a supplier", async function () {
    mockSuppliersDAO(sandbox, {
      delete: async (whereClause: { [key: string]: any }): Promise<void> => {
        throw new Error();
      }
    });
    const mySQLSuppliersRepository = new MySQLSuppliersRepository();

    let error: null | FailedOp = null;
    try {
      await mySQLSuppliersRepository.delete(1);
    } catch(err) {
      error = err;
    }

    expect(error).not.to.be.null;
    expect(error).to.be.instanceOf(FailedOp);
  });
});
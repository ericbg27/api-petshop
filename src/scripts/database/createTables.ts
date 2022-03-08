import { SupplierModel } from "../../repositories/models/SupplierModel"

const models = [
    SupplierModel
]

async function createTables(): Promise<void> {
    for(let counter = 0; counter < models.length; counter++) {
        const model = models[counter];
        await model.sync();
    }
}

createTables();
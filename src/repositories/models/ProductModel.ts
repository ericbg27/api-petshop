import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute } from '@sequelize/core'
import { sequelize } from './db';
import { SupplierModel } from './SupplierModel';

class ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
    declare id: CreationOptional<number>;
    declare supplierId: number;
    declare name: string;
    declare description: string;
    declare price: number;
    declare quantity: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    //declare version: CreationOptional<number>;

    declare supplier?: NonAttribute<SupplierModel>;
};

ProductModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    supplierId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
    /*version: {
        type: DataTypes.INTEGER.UNSIGNED
    }*/
}, {
    sequelize,
    tableName: "products",
    version: true,
    freezeTableName: true,
    timestamps: true
});

export { ProductModel }
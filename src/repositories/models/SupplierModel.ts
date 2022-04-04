import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from '@sequelize/core'
import { sequelize } from './db';

class SupplierModel extends Model<InferAttributes<SupplierModel>, InferCreationAttributes<SupplierModel>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare company: string;
    declare category: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    //declare version: CreationOptional<number>;
};

SupplierModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM("food", "toys"),
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
    },
    {
        sequelize,
        tableName: "suppliers",
        version: true,
        freezeTableName: true,
        timestamps: true
    }
);

export { SupplierModel };
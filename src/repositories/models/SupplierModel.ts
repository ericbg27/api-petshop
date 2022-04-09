import { 
    Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, HasManyGetAssociationsMixin, 
    HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, HasManyRemoveAssociationMixin, 
    HasManyRemoveAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, 
    HasManyCreateAssociationMixin, NonAttribute, Association 
} from '@sequelize/core'
import { sequelize } from './db';
import { ProductModel } from './ProductModel';

class SupplierModel extends Model<InferAttributes<SupplierModel>, InferCreationAttributes<SupplierModel>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare company: string;
    declare category: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    //declare version: CreationOptional<number>;

    declare products?: NonAttribute<ProductModel[]>;

    declare getProducts: HasManyGetAssociationsMixin<ProductModel>;
    declare addProduct: HasManyAddAssociationMixin<ProductModel, number>;
    declare addProducts: HasManyAddAssociationsMixin<ProductModel, number>;
    declare setProducts: HasManySetAssociationsMixin<ProductModel, number>;
    declare removeProduct: HasManyRemoveAssociationMixin<ProductModel, number>;
    declare removeProducts: HasManyRemoveAssociationsMixin<ProductModel, number>;
    declare hasProduct: HasManyHasAssociationMixin<ProductModel, number>;
    declare hasProducts: HasManyHasAssociationsMixin<ProductModel, number>;
    declare countProducts: HasManyCountAssociationsMixin;
    declare createProduct: HasManyCreateAssociationMixin<ProductModel, 'supplierId'>;

    declare static associations: {
        products: Association<SupplierModel, ProductModel>;
    };
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
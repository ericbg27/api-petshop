import { Sequelize } from "@sequelize/core";
import nodeConfig from 'config';

const sequelize = new Sequelize(
    nodeConfig.get<string>('mysql.banco-de-dados'),
    nodeConfig.get<string>('mysql.usuario'),
    nodeConfig.get<string>('mysql.senha'),
    {
        host: nodeConfig.get<string>('mysql.host'),
        dialect: 'mysql'
    }
);

export { sequelize }
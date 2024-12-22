import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

const dbConfig = {
    database: process.env.DB_NAME || 'task_management',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
};


const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        logging: process.env.NODE_ENV !== 'production',
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados bem-sucedida!');
    } catch (error) {
        console.error('Erro ao conectar-se ao banco de dados:', error);
    }
})();

export default sequelize;
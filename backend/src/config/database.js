import { Sequelize } from 'sequelize';
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

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Conexão com o banco de dados "${dbConfig.database}" bem-sucedida!`);
        await sequelize.sync({ alter: true }); // Sincroniza os modelos
        console.log('Modelos sincronizados com o banco de dados!');
    } catch (error) {
        console.error(`Erro ao conectar-se ao banco de dados "${dbConfig.database}":`, error);
        process.exit(1); // Encerra o processo se não for possível conectar
    }
};

initializeDatabase();

export default sequelize;

// Importing Sequelize, a promise-based Node.js ORM for relational databases.
import { Sequelize } from 'sequelize';

// Importing dotenv to manage environment variables from a .env file.
import dotenv from 'dotenv';

// Configuring dotenv to load the appropriate environment file
// based on the NODE_ENV variable ('production' or default to '.env').
dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

// Database configuration object containing details for the database connection.
// If environment variables are not set, default values are used.
const dbConfig = {
    database: process.env.DB_NAME || 'task_management', // Database name
    username: process.env.DB_USER || 'root',          // Database username
    password: process.env.DB_PASSWORD || '',          // Database password
    host: process.env.DB_HOST || 'localhost',         // Host address of the database
    dialect: 'postgres',                              // Type of database (PostgreSQL in this case)
};

// Initializing a Sequelize instance with the database configuration.
// This instance will manage the connection and interact with the database.
const sequelize = new Sequelize(
    dbConfig.database,        // Database name
    dbConfig.username,        // Username
    dbConfig.password,        // Password
    {
        host: dbConfig.host,  // Database host
        dialect: dbConfig.dialect, // Database dialect
        logging: process.env.NODE_ENV !== 'production', // Enable logging in non-production environments
    }
);

// Function to initialize the database connection and synchronize models.
const initializeDatabase = async () => {
    try {
        // Attempting to authenticate with the database using Sequelize.
        await sequelize.authenticate();
        console.log(`Successfully connected to the database "${dbConfig.database}"!`);

        // Synchronizing all models with the database
        // Using force to recreate tables
        await sequelize.sync({ force: true }); // Removes and recreates tables
        // Using alter to update tables
        //await sequelize.sync({ alter: true }); // Updates tables without data loss
        // Default behavior (force: false)
        //await sequelize.sync(); // Creates tables if they do not exist

    
        console.log('Models synchronized with the database!');
    } catch (error) {
        // Logging and exiting the application if an error occurs during connection or synchronization.
        console.error(`Error connecting to the database "${dbConfig.database}":`, error);
        process.exit(1); // Exit the application with a failure code.
    }
};

// Calling the function to initialize the database.
initializeDatabase();

// Exporting the Sequelize instance for use in other parts of the application.
export default sequelize;

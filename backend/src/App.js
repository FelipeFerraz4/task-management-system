import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasksRouter.js'; // Import task routes
import userRoutes from './routes/usersRouter.js'; // Import user routes

class App {
    constructor() {
        this.app = express(); // Initialize the Express application

        // Load environment variables based on the current environment
        dotenv.config({
            path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
        });

        this.middlewares(); // Configure middlewares
        this.routes(); // Set up routes
    }

    middlewares() {
        // Enable CORS for cross-origin resource sharing
        this.app.use(cors());

        // Enable JSON parsing for incoming requests
        this.app.use(express.json());
    }

    routes() {
        // Mount the task routes under the `/api/tasks` endpoint
        this.app.use('/api/tasks', taskRoutes);

        // Mount the user routes under the `/api/users` endpoint
        this.app.use('/api/users', userRoutes);

        // Define a simple route to confirm the server is running
        this.app.get('/', (req, res) => {
            res.send('Server is running!');
        });

        // Define a route to return app configuration details
        this.app.get('/api/config', (req, res) => {
            res.json({
                port: process.env.PORT, // The port the server is running on
                environment: process.env.NODE_ENV, // The current environment (e.g., development or production)
                dbHost: process.env.DB_HOST, // The database host from environment variables
            });
        });
    }
}

export default App; // Export the App class to be used in other parts of the application

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasksRouter.js';
import userRoutes from './routes/usersRouter.js';

class App {
    constructor() {
        this.app = express();
        dotenv.config({
            path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
        });
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/tasks', taskRoutes);
        this.app.use('/api/users', userRoutes);
        this.app.get('/', (req, res) => {
            res.send('Servidor está rodando!');
        });
        this.app.get('/api/config', (req, res) => {
            res.json({
                port: process.env.PORT,
                environment: process.env.NODE_ENV,
                dbHost: process.env.DB_HOST,
            });
        });
    }
}

export default App;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
  });

const app = express();

const PORT = process.env.PORT || 2000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor está rodando!');
});

app.get('/api/config', (req, res) => {
    res.json({
      port: process.env.PORT,
      environment: process.env.NODE_ENV,
      dbHost: process.env.DB_HOST,
    });
  });
  

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

import { createClient } from 'redis';
import dotenv from 'dotenv';

// Carregue as variáveis de ambiente do arquivo .env
dotenv.config();

// Crie o cliente Redis usando as variáveis do .env
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`, // Use variáveis do .env
});

// Conecte ao Redis
redisClient
  .connect()
  .catch((err) => console.error('Erro ao conectar ao Redis:', err));

// Exporta o cliente Redis para uso em outros arquivos
export default redisClient;

import { createClient } from 'redis';
import dotenv from 'dotenv';

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Crie o cliente Redis usando as variáveis do .env
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

let isRedisConnected = false;

// Conecte ao Redis
const connectRedis = async () => {
  try {
    if (!isRedisConnected) {
      await redisClient.connect();
      console.log('Connected Redis!');
      isRedisConnected = true;
    } else {
      console.log('Redis connection already established.');
    }
  } catch (err) {
    console.error('Erro ao conectar ao Redis:', err);
  }
};

// Função para fechar a conexão com o Redis
const closeRedis = async () => {
  try {
    if (redisClient.isOpen) {
      await redisClient.quit();
      console.log('Conexão com o Redis fechada.');
    } else {
      console.log('A conexão já estava fechada.');
    }
  } catch (err) {
    console.error('Erro ao fechar a conexão com o Redis:', err);
  }
};

// Exportando a função de conexão e o cliente Redis
export { connectRedis, redisClient, closeRedis };
export default redisClient;

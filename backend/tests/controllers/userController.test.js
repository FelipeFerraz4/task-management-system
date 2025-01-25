import request from 'supertest';
import App from '../../src/App';
import { closeDatabase } from '../../src/config/database';
import { closeRedis } from '../../src/config/redis'; // Importe a função para fechar o Redis

const app = new App().app;

describe('GET /', () => {
  it('should return "Server is running!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Server is running!');
  });
});

// Fechando as conexões após os testes
afterAll(async () => {
  await closeDatabase(); // Fecha a conexão com o banco de dados
  await closeRedis(); // Fecha a conexão com o Redis
});

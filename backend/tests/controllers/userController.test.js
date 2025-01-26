import request from 'supertest';
import App from '../../src/App';
import { initializeDatabase, closeDatabase } from '../../src/config/database';
import { connectRedis, closeRedis } from '../../src/config/redis'; // Importe a função para fechar o Redis

const app = new App().app;

beforeAll(async () => {
  // Inicia a conexão com o banco de dados para o ambiente de teste
  await connectRedis(); 
  await initializeDatabase();
});

afterAll(async () => {
  await closeDatabase(); // Fecha a conexão com o banco de dados
  await closeRedis(); // Fecha a conexão com o Redis
  // await closeDatabase();
  // await closeRedis();
});

describe('GET /', () => {
  it('should return "Server is running!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Server is running!');
  });
});

describe('User Routes', () => {

  let authToken;

  it('should register a user', async () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'password123',
      role: 'employee',
    };

    const response = await request(app)
      .post('/api/users/register')
      .set('Content-Type', 'application/json')
      .send(data);
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('registed user');
  });

  it('should login the user and return a token', async () => {
    const data = {
      email: 'johndoe@gmail.com',
      password: 'password123',
    };
    
    const response = await request(app)
      .post('/api/users/login')
      .set('Content-Type', 'application/json')
      .send(data);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.token).toBeDefined();
    authToken = response.body.token; // Guarda o token para usar nos testes subsequentes
  });

  it('should retrieve user profile', async () => {
    const response = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body.name).toBe('John Doe');
    expect(response.body.email).toBe('johndoe@gmail.com');
  });

  it('should update user profile', async () => {
    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'application/json')
      .send({
        name: 'Updated User',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Perfil atualizado com sucesso');
    expect(response.body.user.name).toBe('Updated User');
  });

  it('should log out the user', async () => {
    const response = await request(app)
      .post('/api/users/logout')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logout realizado com sucesso');
  });
});


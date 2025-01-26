import request from 'supertest';
import App from '../../src/App';
import { initializeDatabase, closeDatabase } from '../../src/config/database';
import { connectRedis, closeRedis } from '../../src/config/redis';

const app = new App().app;

let authToken; // Token para autenticação do usuário

beforeAll(async () => {
  await connectRedis();
  await initializeDatabase();

  // Criando um usuário e autenticando para obter o token
  const userData = {
    name: 'Task Tester',
    email: 'tasktester@gmail.com',
    password: 'password123',
    role: 'employee',
  };

  await request(app).post('/api/users/register').send(userData);

  const loginResponse = await request(app)
    .post('/api/users/login')
    .send({ email: userData.email, password: userData.password });

  authToken = loginResponse.body.token;
});

afterAll(async () => {
  await closeDatabase();
  await closeRedis();
});

describe('Task Routes', () => {
  let taskId;

  it('should create a new task', async () => {
    const taskData = {
      title: 'New Task',
      description: 'This is a new task for testing.',
      dueDate: '2025-01-31',
    };

    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send(taskData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(taskData.title);
    expect(response.body.description).toBe(taskData.description);

    taskId = response.body.id; // Armazena o ID da tarefa para testes subsequentes
  });

  it('should retrieve all tasks for the user', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should retrieve a specific task by ID', async () => {
    const response = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', taskId);
    expect(response.body).toHaveProperty('title', 'New Task');
  });

  it('should update a task by ID', async () => {
    const updatedTaskData = {
      title: 'Updated Task Title',
      description: 'Updated description.',
      status: 'in-progress',
    };

    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedTaskData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', taskId);
    expect(response.body.title).toBe(updatedTaskData.title);
    expect(response.body.status).toBe(updatedTaskData.status);
  });

  it('should delete a task by ID', async () => {
    const response = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Tarefa deletada');
  });

  it('should return 404 for a non-existent task', async () => {
    const response = await request(app)
      .get(`/api/tasks/123e4567-e89b-12d3-a456-426614174000`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Tarefa não encontrada');
  });
});

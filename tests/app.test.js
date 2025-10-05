const request = require('supertest');
const app = require('../src/app');

describe('CI/CD Demo App', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('Hello from CI/CD Pipeline');
  });

  test('GET /health should return health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('GET /api/info should return API info', async () => {
    const response = await request(app).get('/api/info');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('CI/CD Demo API');
  });

  test('GET /nonexistent should return 404', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(404);
  });
});
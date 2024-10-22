import app from '../src/app';
import request from 'supertest';

describe('GET /api/weather', () => {
  it('Debería devolver el informe del clima para los vuelos', async () => {
    const response = await request(app).get('/api/weather');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);

    // Verificamos que los objetos tengan la estructura esperada
    response.body.forEach((flightReport: any) => {
      expect(flightReport).toHaveProperty('flight');
      expect(flightReport).toHaveProperty('origin');
      expect(flightReport.origin).toHaveProperty('weather');
      expect(flightReport).toHaveProperty('destination');
      expect(flightReport.destination).toHaveProperty('weather');
    });
  });
});
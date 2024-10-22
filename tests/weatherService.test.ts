import { getWeather } from '../src/services/weatherService';
import axios from 'axios';

jest.mock('axios');

describe('Weather Service', () => {
  it('Debería devolver datos de clima desde la API', async () => {
    const mockWeatherData = { data: { weather: [{ description: 'sunny' }], main: { temp: 25 } } };
    
    // Mock de axios.get para que devuelva datos de clima falsos
    (axios.get as jest.Mock).mockResolvedValue(mockWeatherData);

    const weather = await getWeather(48.8566, 2.3522); // Coordenadas de París, por ejemplo

    expect(weather).toEqual(mockWeatherData.data);
  });

  it('Debería manejar errores al hacer la solicitud de clima', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Error en la API de clima'));

    await expect(getWeather(48.8566, 2.3522)).rejects.toThrow('Error al obtener los datos del clima');
  });
});
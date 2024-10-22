import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 });

export const getWeather = async (latitude: number, longitude: number) => {
  const cacheKey = `${latitude}-${longitude}`;
  const cachedWeather = cache.get(cacheKey);

  if (cachedWeather) {
    return cachedWeather;
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric'
      }
    });

    const weatherData = response.data;

    cache.set(cacheKey, weatherData);
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Error al obtener los datos del clima');
  }
};
import { Request, Response } from 'express';
import { getWeather } from '../services/weatherService';
import { parseCsv } from '../utils/csvParser';
import { FlightTicket } from '../models/FlightTicket';
import { WeatherReport } from '../models/WeatherReport';
const pLimit = require('p-limit'); // Importar p-limit correctamente en formato CommonJS
const limit = pLimit(5);

export const getWeatherForFlights = async (req: Request, res: Response) => {
  try {
    const filePath = 'src/data/challenge_dataset.csv';
    const tickets: FlightTicket[] = await parseCsv(filePath);

    const weatherReports: WeatherReport[] = await Promise.all(
      tickets.map(ticket =>
        limit(async () => {
          const originWeather = await getWeather(ticket.origin_latitude, ticket.origin_longitude);
          const destinationWeather = await getWeather(ticket.destination_latitude, ticket.destination_longitude);

          return {
            flight: `${ticket.airline} ${ticket.flight_num}`,
            origin: {
              airport: ticket.origin,
              weather: originWeather,
            },
            destination: {
              airport: ticket.destination,
              weather: destinationWeather,
            },
          } as WeatherReport;
        })
      )
    );

    res.json(weatherReports);
  } catch (error) {
    console.error('Error al obtener el clima para los vuelos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
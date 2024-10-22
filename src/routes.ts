import { Router } from 'express';
import { getWeatherForFlights } from './controllers/weatherController';

const router = Router();

// Ruta para obtener el clima para los vuelos
router.get('/weather', getWeatherForFlights);

export default router;
interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherReport {
  flight: string;
  origin: {
    airport: string;
    weather: Weather[];
  };
  destination: {
    airport: string;
    weather: Weather[];
  };
}
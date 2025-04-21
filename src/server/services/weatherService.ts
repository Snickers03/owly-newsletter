// server/services/weatherService.ts

type WeatherSummary = {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
};

export const fetchWeatherData = async (
  city: string,
): Promise<WeatherSummary> => {
  const apiKey = process.env.WEATHER_API_KEY ?? "";
  city = city
    .replace(/ö/g, "oe")
    .replace(/ä/g, "ae")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");

  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch weather data for city: ${city}`);
  }

  const data = await res.json();

  return {
    city: data.location.name,
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
    icon: `https:${data.current.condition.icon}`,
  };
};

export const getWeather = async (city: string): Promise<{ temperature: number, feelsLike: number }> => {
  const URL = "https://api.api-ninjas.com/v1/weather?city=" + city;
  const API_KEY = Deno.env.get("API_KEY");
  if (!API_KEY) {
	throw new Error("API_KEY not found");
  }

  const response = await fetch(URL, {
	headers: {
	  "X-Api-Key": API_KEY,
	},
  });

  if (!response.ok) {
	throw new Error("Weather API failed");
  }

  const data = await response.json();

  return {
	temperature: data.temp,
	feelsLike: data.feels_like,
  };
};
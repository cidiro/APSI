export const cityQuality = async (city: string): Promise<{ temperature: number, feelsLike: number, CO2: number, overallAQI: number }> => {
	const weatherURL = "https://api.api-ninjas.com/v1/weather?city=" + city;
	const airURL = "https://api.api-ninjas.com/v1/airquality?city=" + city;
	const API_KEY = Deno.env.get("API_KEY");
	if (!API_KEY) {
		throw new Error("API_KEY not found");
	}

	// use Promise.all to make both requests at the same time
	const [weatherResponse, airResponse] = await Promise.all([
		fetch(weatherURL, {
			headers: {
				"X-Api-Key": API_KEY,
			},
		}),
		fetch(airURL, {
			headers: {
				"X-Api-Key": API_KEY,
			},
		}),
	]);

	if (!weatherResponse.ok || !airResponse.ok) {
		throw new Error("API request failed");
	}

	const weatherData = await weatherResponse.json();
	const airData = await airResponse.json();

	return {
		temperature: weatherData.temp,
		feelsLike: weatherData.feels_like,
		CO2: airData.CO.concentration,
		overallAQI: airData.overall_aqi,
	};
}

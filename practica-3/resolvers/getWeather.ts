type Weather = {
	condition: string,
	temperature: number,
	precipitation: number,
};


const getWeather = async (city: string): Promise<Weather> => {
	const API_KEY = "bb62ec3bfb154e39889154258230610"; // API Key podría cargarse del env

	const data = await fetch(
	  `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`,
	);

	if (data.status !== 200) {
	  throw new Error(`${city} not found in api.weatherapi.com`);
	}

	const json = await data.json();
	return {
		condition: json.current.condition.text,
		temperature: json.current.temp_c,
		precipitation: json.current.precip_mm,
	}
  };

  export default getWeather;

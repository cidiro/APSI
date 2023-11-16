// FUCKING restcountries.com NO VALE PARA SACAR LA REGION
// SI LE PASA EL CODIGO "US" TE DEVUELVE "AMERICAS" EN LUGAR DE "AMERICA"
// USO LA WEATHER API EN SU LUGAR


const getTimezone = async (city: string): Promise<string> => {
	const API_KEY = "bb62ec3bfb154e39889154258230610"; // API Key podría cargarse del env

	const data = await fetch(
	  `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`,
	);

	if (data.status !== 200) {
	  throw new Error(`${city} not found in api.weatherapi.com`);
	}

  const json = await data.json();
  return json.location.tz_id;
};

export default getTimezone;

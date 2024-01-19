export const getCapital = async (country: string): Promise<string> => {
	const countriesAPI = "https://api.api-ninjas.com/v1/country?name=" + country;
	const API_KEY = Deno.env.get("API_KEY");
	if (!API_KEY)
		throw new Error("Environmental variable \"API_KEY\" hasn't been set!");

	const response = await fetch(countriesAPI, {
		headers: {
			"X-Api-Key": API_KEY,
		},
	});

	if (!response.ok)
		throw new Error("API request failed");

	const data = await response.json();

	return data[0].capital
}

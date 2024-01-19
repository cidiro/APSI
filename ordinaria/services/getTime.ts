export const getTime = async (city: string): Promise<string> => {
	const worldTimeAPI = "https://api.api-ninjas.com/v1/worldtime?city=" + city;
	const API_KEY = Deno.env.get("API_KEY");
	if (!API_KEY)
		throw new Error("Environmental variable \"API_KEY\" hasn't been set!");

	const response = await fetch(worldTimeAPI, {
		headers: {
			"X-Api-Key": API_KEY,
		},
	});

	if (!response.ok)
		throw new Error("API request failed");

	const data = await response.json();

	return data.datetime;
}

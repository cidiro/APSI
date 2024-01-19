export const numberIsValid = async (number: string): Promise<boolean> => {
	const validatorURL = "https://api.api-ninjas.com/v1/validatephone?number=" + number;
	const API_KEY = Deno.env.get("API_KEY");
	if (!API_KEY)
		throw new Error("Environmental variable \"API_KEY\" hasn't been set!");

	const response = await fetch(validatorURL, {
		headers: {
			"X-Api-Key": API_KEY,
		},
	});

	if (!response.ok)
		throw new Error("API request failed");

	const data = await response.json();

	return data.is_valid;
}

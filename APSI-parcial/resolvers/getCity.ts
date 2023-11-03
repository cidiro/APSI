
const getCity = async (country_code: string, zipcode: number): Promise<string> => {
  const data = await fetch(
    `https://zip-api.eu/api/v1/info/${country_code}-${zipcode}`,
  );

  if (data.status !== 200) {
    throw new Error(`Place ${country_code}-${zipcode} not found in zip-api.eu`);
  }

  const json = await data.json();
  return json.place_name;
};

export default getCity;


const getCountry = async (country_code: string): Promise<string> => {
  const data = await fetch(
    `https://restcountries.com/v3.1/alpha/${country_code}`,
  );

  if (data.status !== 200) {
    throw new Error(`Country code ${country_code} not found in restcountries.com`);
  }

  const json = await data.json();
  return json[0].name.common;
};

export default getCountry;


const getTime = async (timezone: string): Promise<string> => {
	const data = await fetch(
	  `http://worldtimeapi.org/api/timezone/${timezone}`,
	);

	if (data.status !== 200) {
	  throw new Error(`${timezone} not found in worldtimeapi.org`);
	}

	const json = await data.json();
	return json.datetime;
  };

  export default getTime;

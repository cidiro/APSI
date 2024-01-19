import { getWeather } from "./services/getWeather.ts";

const weather = await getWeather("Madrid");
console.log(weather);

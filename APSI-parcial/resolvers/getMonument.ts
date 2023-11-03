import { Request, Response } from "npm:express@4.18.2";
import MonumentModel from "../db/monument.ts";
import getTime from "./getTime.ts";
import getWeather from "./getWeather.ts";


const getMonument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const monument = await MonumentModel.findOne({ _id: id }).exec();

    if (!monument) {
      res.status(404).send("Monument not found.");
      return;
    }

    res.status(200).send({
      id: monument._id.toString(),
      name: monument.name,
      description: monument.description,
      zipcode: monument.zipcode,
      city_name: monument.city_name,
      country_name: monument.country_name,
      country_code: monument.country_code,
      region_name: monument.region_name,
      timezone: monument.timezone,
      datetime: await getTime(monument.timezone),
      weather: await getWeather(monument.city_name),
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMonument;

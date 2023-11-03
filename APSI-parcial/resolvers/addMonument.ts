import { Request, Response } from "npm:express@4.18.2";
import MonumentModel from "../db/monument.ts";
import getCountry from "./getCountry.ts";
import getCity from "./getCity.ts";
import getTimezone from "./getTimezone.ts";


const addMonument = async (req: Request, res: Response) => {
  try {
    const { name, description, country_code,  zipcode } = req.body;
    if (!name || !description || !country_code || !zipcode) {
      res.status(500).send("Monument must have a name, description, zipcode and\
                            ISO code of the country included in its information.");
      return;
    }

    if (isNaN(parseInt(zipcode))) {
      res.status(500).send("Zipcode must be a valid number.");
      return;
    }

    const alreadyExists = await MonumentModel.findOne({ name, zipcode }).exec();
    if (alreadyExists) {
      res.status(400).send("Monument with that name already exists in the given zipcode.");
      return;
    }

    const city_name = await getCity(country_code, zipcode);
    const timezone = await getTimezone(city_name);

    const newMonument = new MonumentModel({
       name,
       description,
       zipcode,
       city_name: city_name,
       country_name: await getCountry(country_code),
       country_code,
       region_name: timezone.split("/")[0],
       timezone: timezone,
      });
    await newMonument.save();

    res.status(200).send({
      id: newMonument._id.toString(),
      name: newMonument.name,
      description: newMonument.description,
      zipcode: newMonument.zipcode,
      city_name: newMonument.city_name,
      country_name: newMonument.country_name,
      country_code: newMonument.country_code,
      region_name: newMonument.region_name,
      timezone: newMonument.timezone,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addMonument;

import { Request, Response } from "npm:express@4.18.2";
import MonumentModel from "../db/monument.ts";
import getCountry from "./getCountry.ts";
import getCity from "./getCity.ts";
import getTimezone from "./getTimezone.ts";


const updateMonument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, country_code, zipcode } = req.body;

    if (!name || !description || !country_code || !zipcode) {
      res.status(400).send("Monument must have a name, description, zipcode and\
                            ISO code of the country included in its information.");
      return;
    }

    if (isNaN(parseInt(zipcode))) {
      res.status(500).send("Zipcode must be a valid number.");
      return;
    }

    const city_name = await getCity(country_code, zipcode);
    const timezone = await getTimezone(city_name);

    const updatedMonument = await MonumentModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
        zipcode,
        city_name: city_name,
        country_name: await getCountry(country_code),
        country_code,
        region_name: timezone.split("/")[0],
        timezone: timezone,
      },
      { new: true }
    ).exec();

    if (!updatedMonument) {
      res.status(404).send("Monument not found");
      return;
    }

    res.status(200).send({
      id: updatedMonument._id.toString(),
      name: updatedMonument.name,
      description: updatedMonument.description,
      zipcode: updatedMonument.zipcode,
      city_name: updatedMonument.city_name,
      country_name: updatedMonument.country_name,
      country_code: updatedMonument.country_code,
      region_name: updatedMonument.region_name,
      timezone: updatedMonument.timezone,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateMonument;

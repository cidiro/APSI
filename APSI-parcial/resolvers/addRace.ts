import { Request, Response } from "npm:express@4.18.2";
import RaceModel from "../db/race.ts";


const addCharacter = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(500).send("Race must have a name and a description.");
      return;
    }

    const alreadyExists = await RaceModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("Race with that name already exists.");
      return;
    }

    const updatedRace = new RaceModel({ name, description });
    await updatedRace.save();

    res.status(200).send({
      name: updatedRace.name,
      description: updatedRace.description,
      id: updatedRace._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addCharacter;

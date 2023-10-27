import { Request, Response } from "npm:express@4.18.2";
import CharacterModel from "../db/character.ts";
import RaceModel from "../db/race.ts";


const updateCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, race, description, abilities } = req.body;

    if (!name || !race || !description || !abilities) {
      res.status(400).send("Complete character information is required.");
      return;
    }

    const raceExists = await RaceModel.findOne({ name: race }).exec();
    if (!raceExists) {
      res.status(500).send("Race does not exist.");
      return;
    }

    const updatedCharacter = await CharacterModel.findOneAndUpdate(
      { _id: id },
      { name, race, description, abilities },
      { new: true }
    ).exec();

    if (!updatedCharacter) {
      res.status(404).send("Character not found");
      return;
    }

    res.status(200).send({
      name: updatedCharacter.name,
      race: updatedCharacter.race,
      description: updatedCharacter.description,
      abilities: updatedCharacter.abilities,
      id: updatedCharacter._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateCharacter;

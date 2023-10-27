import { Request, Response } from "npm:express@4.18.2";
import CharacterModel from "../db/character.ts";
import RaceModel from "../db/race.ts";


const addCharacter = async (req: Request, res: Response) => {
  try {
    const { name, race, description, abilities } = req.body;
    if (!name || !race || !description || !abilities) {
      res.status(500).send("Character must have all complete information.");
      return;
    }

    const alreadyExists = await CharacterModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("Character with that name already exists.");
      return;
    }

    const raceExists = await RaceModel.findOne({ name: race }).exec();
    if (!raceExists) {
      res.status(500).send("Race does not exist.");
      return;
    }

    const newCharacter = new CharacterModel({ name, race, description, abilities });
    await newCharacter.save();

    res.status(200).send({
      name: newCharacter.name,
      race: newCharacter.race,
      description: newCharacter.description,
      abilities: newCharacter.abilities,
      id: newCharacter._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addCharacter;

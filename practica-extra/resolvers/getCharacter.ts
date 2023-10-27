import { Request, Response } from "npm:express@4.18.2";
import CharacterModel from "../db/character.ts";


const getCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const character = await CharacterModel.findOne({ _id: id }).exec();

    if (!character) {
      res.status(404).send("Character not found.");
      return;
    }

    res.status(200).send({
      name: character.name,
      race: character.race,
      description: character.description,
      abilities: character.abilities,
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getCharacter;

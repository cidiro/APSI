import { Request, Response } from "npm:express@4.18.2";
import CharacterModel from "../db/character.ts";


const getCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await CharacterModel.find().exec();
    if (!characters) {
      res.status(404).send("There are no characters.");
      return;
    }
    res.status(200).send(characters);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getCharacters;

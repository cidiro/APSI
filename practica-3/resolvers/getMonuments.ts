import { Request, Response } from "npm:express@4.18.2";
import MonumentModel from "../db/monument.ts";


const getMonuments = async (req: Request, res: Response) => {
  try {
    const monuments = await MonumentModel.find().exec();
    if (!monuments) {
      res.status(404).send("There are no monuments.");
      return;
    }
    res.status(200).send(monuments);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMonuments;

import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/client.ts";


const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await ClientModel.find().exec();
    if (!clients) {
      res.status(404).send("There are no clients.");
      return;
    }
    res.status(200).send(clients);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getClients;

import { Request, Response } from "npm:express@4.18.2";
import ManagerModel from "../db/manager.ts";


const getManagers = async (req: Request, res: Response) => {
  try {
    const managers = await ManagerModel.find().exec();
    if (!managers) {
      res.status(404).send("There are no managers.");
      return;
    }
    res.status(200).send(managers);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getManagers;

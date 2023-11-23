import { Request, Response } from "npm:express@4.18.2";
import ManagerModel from "../db/manager.ts";


const getManager = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const manager = await ManagerModel.findOne({ id }).exec();

    if (!manager) {
      res.status(404).send("Manager not found.");
      return;
    }

    res.status(200).send({
      name: manager.name,
      email: manager.email,
      phone: manager.phone,
      clients: manager.clients,
      id: manager.id
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getManager;

// @ts-ignore: Deno bug
import { Request, Response } from "npm:express@4.18.2";
import ManagerModel from "../db/manager.ts";


const addManager = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, id} = req.body;
    if (!name || !email || !phone || !id) {
      res.status(500).send("Manager must have a name, email, phone, and id.");
      return;
    }

    const alreadyExists = await ManagerModel.findOne({ id }).exec();
    if (alreadyExists) {
      res.status(400).send("Manager with that id already exists.");
      return;
    }

    const newManager = new ManagerModel({
      name,
      email,
      phone,
      id,
      client_ids: []
    });
    await newManager.save();

    res.status(200).send({
      name: newManager.name,
      email: newManager.email,
      phone: newManager.phone,
      id: newManager.id,
      client_ids: newManager.clients
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addManager;

// @ts-ignore: Deno bug
import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/client.ts";
import ManagerModel from "../db/manager.ts";


const updateManager = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, clients } = req.body;

    if (clients.length > 10) {
      res.status(400).send("Manager cannot have more than 10 clients.");
      return;
    }

    for (let i = 0; i < clients.length; i++) {
      const clientExists = await ClientModel.findOne({ id: clients[i] }).exec();
      if (!clientExists) {
        res.status(400).send("Client with id " + clients[i] + " does not exist.");
        return;
      }
    }

    const updatedManager = await ManagerModel.findOneAndUpdate(
      { id },
      {
        name,
        email,
        phone,
        clients
      },
      { new: true }
    ).exec();

    if (!updatedManager) {
      res.status(404).send("Manager not found");
      return;
    }

    res.status(200).send({
      name: updatedManager.name,
      email: updatedManager.email,
      phone: updatedManager.phone,
      clients: updatedManager.clients,
      id: updatedManager.id
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateManager;

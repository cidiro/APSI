// @ts-ignore: Deno bug
import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/client.ts";
import ManagerModel from "../db/manager.ts";


const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, balance, mortgages, manager_id } = req.body;

    /*if (!name || !email || !phone || !balance) {
      res.status(400).send("Client must have a name, email,\
                            phone, and balance.");
      return;
    }*/

    if (manager_id) {
      const managerExists = await ManagerModel.findOne({ id: manager_id }).exec();
      if (!managerExists) {
        res.status(400).send("Manager with that id does not exist.");
        return;
      }
    }

    const updatedClient = await ClientModel.findOneAndUpdate(
      { id },
      {
        name,
        email,
        phone,
        balance,
        mortgages,
        manager_id
      },
      { new: true }
    ).exec();

    if (!updatedClient) {
      res.status(404).send("Client not found");
      return;
    }

    res.status(200).send({
      name: updatedClient.name,
      email: updatedClient.email,
      phone: updatedClient.phone,
      balance: updatedClient.balance,
      mortgages: updatedClient.mortgages,
      id: updatedClient.id,
      manager_id: updatedClient.manager_id
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateClient;

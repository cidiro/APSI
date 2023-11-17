// @ts-ignore: Deno bug
import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/client.ts";


const addClient = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, balance, id} = req.body;
    if (!name || !email || !phone || !balance || !id) {
      res.status(500).send("Client must have a name, email, phone,\
                            balance, and id.");
      return;
    }

    if (isNaN(parseInt(balance))) {
      res.status(500).send("Balance must be a valid number.");
      return;
    }

    const alreadyExists = await ClientModel.findOne({ id }).exec();
    if (alreadyExists) {
      res.status(400).send("Client with that id already exists.");
      return;
    }

    const newClient = new ClientModel({
      name,
      email,
      phone,
      balance,
      mortgages: [],
      id,
    });
    await newClient.save();

    res.status(200).send({
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      balance: newClient.balance,
      mortgages: newClient.mortgages,
      id: newClient.id,
      manager_id: newClient.manager_id
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addClient;

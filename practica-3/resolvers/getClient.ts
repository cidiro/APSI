import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/client.ts";


const getClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const client = await ClientModel.findOne({ id }).exec();

    if (!client) {
      res.status(404).send("Client not found.");
      return;
    }

    res.status(200).send({
      name: client.name,
      email: client.email,
      phone: client.phone,
      balance: client.balance,
      mortgages: client.mortgages,
      id: client.id,
      manager_id: client.manager_id,
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getClient;

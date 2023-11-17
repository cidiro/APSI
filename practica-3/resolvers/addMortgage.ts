// @ts-ignore: Deno bug
import { Request, Response } from "npm:express@4.18.2";
import MortgageModel from "../db/mortgage.ts";
import ClientModel from "../db/client.ts";
import ManagerModel from "../db/manager.ts";


const addMortgage = async (req: Request, res: Response) => {
  try {
    const {amount, client_id, manager_id } = req.body;
    if (!amount || !client_id || !manager_id) {
      res.status(500).send("Mortgage must have an amount,\
                            client id, and manager id.");
      return;
    }

    if (isNaN(parseInt(amount))) {
      res.status(500).send("Amount must be a valid number.");
      return;
    }

    if (amount > 1000000) {
      res.status(500).send("Amount must be less than 1 million.");
      return;
    }

    const clientExists = await ClientModel.findOne({ id: client_id }).exec();
    if (!clientExists) {
      res.status(400).send("Client with that id does not exist.");
      return;
    }

    const managerExists = await ManagerModel.findOne({ id: manager_id }).exec();
    if (!managerExists) {
      res.status(400).send("Manager with that id does not exist.");
      return;
    }

    const newMortgage = new MortgageModel({
      amount,
      client_id,
      manager_id
    });
    await newMortgage.save();

    res.status(200).send({
      amount: newMortgage.amount,
      terms: newMortgage.terms,
      terms_remaining: newMortgage.terms_remaining,
      client_id: newMortgage.client_id,
      manager_id: newMortgage.manager_id,
      id : newMortgage._id.toString()
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addMortgage;

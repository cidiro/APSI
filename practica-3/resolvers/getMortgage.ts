import { Request, Response } from "npm:express@4.18.2";
import MortgageModel from "../db/mortgage.ts";


const getMortgage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mortgage = await MortgageModel.findOne({ _id: id }).exec();

    if (!mortgage) {
      res.status(404).send("Mortgage not found.");
      return;
    }

    res.status(200).send({
      id: mortgage._id.toString(),
      amount: mortgage.amount,
      terms: mortgage.terms,
      terms_remaining: mortgage.terms_remaining,
      client_id: mortgage.client_id,
      manager_id: mortgage.manager_id,
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMortgage;

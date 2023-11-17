// @ts-ignore: Deno bug
import { Request, Response } from "npm:express@4.18.2";
import MortgageModel from "../db/mortgage.ts";


const deleteMortgage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mortgage = await MortgageModel.findOneAndDelete({ _id: id }).exec();
    if (!mortgage) {
      res.status(404).send("Mortgage not found.");
      return;
    }
    res.status(200).send("Mortgage deleted.");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteMortgage;

import { Request, Response } from "npm:express@4.18.2";
import MortgageModel from "../db/mortgage.ts";


const getMortgages = async (req: Request, res: Response) => {
  try {
    const mortgages = await MortgageModel.find().exec();
    if (!mortgages) {
      res.status(404).send("There are no mortgages.");
      return;
    }
    res.status(200).send(mortgages);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMortgages;

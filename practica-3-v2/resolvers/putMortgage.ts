// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";

import { Mortgage } from "../types.ts";
import { MortgageModel, MortgageModelType } from "../db/mortgage.ts";
import { getMortgageFromModel } from "../controllers/getMortgageFromModel.ts";

export const putMortgage = async (
  req: Request<{ id: string }, {}, MortgageModelType>,
  res: Response<Mortgage | { error: unknown }>
) => {
  const id = req.params.id;
  const { amount, terms, terms_remaining, clientID, managerID } = req.body;
  try {
    const mortgage = await MortgageModel.findByIdAndUpdate(
      id,
      { amount, terms, terms_remaining, clientID, managerID },
      { new: true, runValidators: true }
    );

    if (!mortgage) {
      res.status(404).send({ error: "Mortgage not found" });
      return;
    }
    const mortgageResponse: Mortgage = await getMortgageFromModel(mortgage);
    res.status(200).json(mortgageResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

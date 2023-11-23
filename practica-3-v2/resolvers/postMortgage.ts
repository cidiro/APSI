// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Mortgage } from "../types.ts";

import { MortgageModel, MortgageModelType } from "../db/mortgage.ts";
import { getMortgageFromModel } from "../controllers/getMortgageFromModel.ts";

export const postMortgage = async (
  req: Request<{}, {}, MortgageModelType>,
  res: Response<Mortgage | { error: unknown }>
) => {
  try {
    const { amount, terms, terms_remaining, clientID, managerID } = req.body;
    const mortgage = new MortgageModel({
      amount,
      terms,
      terms_remaining,
      clientID,
      managerID,
    });
    await mortgage.save();

    const mortgageResponse: Mortgage = await getMortgageFromModel(mortgage);

    res.status(201).json(mortgageResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

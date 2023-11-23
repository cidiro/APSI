// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Mortgage } from "../types.ts";

import { MortgageModel } from "../db/mortgage.ts";
import { getMortgageFromModel } from "../controllers/getMortgageFromModel.ts";

export const getMortgage = async (
  req: Request<{ id: string }>,
  res: Response<Mortgage | { error: unknown }>
) => {
  const id = req.params.id;
  try {
    const mortgage = await MortgageModel.findById(id).exec();
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

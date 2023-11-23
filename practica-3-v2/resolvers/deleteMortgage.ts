// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";

import { MortgageModel, MortgageModelType } from "../db/mortgage.ts";

export const deleteMortgage = async (
  req: Request<{ id: string }, {}>,
  res: Response<string | { error: unknown }>
) => {
  const id = req.params.id;
  const mortgage = await MortgageModel.findByIdAndDelete(id).exec();
  if (!mortgage) {
    res.status(404).send({ error: "Mortgage not found" });
    return;
  }
  res.status(200).send("Mortgage deleted");
};

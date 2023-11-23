// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Mortgage } from "../types.ts";

import { MortgageModel } from "../db/mortgage.ts";
import { getMortgageFromModel } from "../controllers/getMortgageFromModel.ts";

export const getMortgages = async (
  _req: Request,
  res: Response<Mortgage[] | { error: unknown }>
) => {
  try {
    const mortgages = await MortgageModel.find({}).exec();
    const mortgagesResponse: Mortgage[] = await Promise.all(
      mortgages.map((mortgage: Mortgage) => getMortgageFromModel(mortgage))
    );
    res.status(200).json(mortgagesResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

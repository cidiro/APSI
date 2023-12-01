// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";

import { BusinessModel } from "../../db/business/business.ts";

export const deleteBusiness = async (
  req: Request<{ id: string }, {}>,
  res: Response<string | { error: unknown }>,
) => {
  const id = req.params.id;
  const business = await BusinessModel.findByIdAndDelete(id).exec();
  if (!business) {
    res.status(404).send({ error: "Business not found" });
    return;
  }
  res.status(200).send("Business deleted");
};

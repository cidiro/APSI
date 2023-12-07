// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { BusinessModel, BusinessModelType } from "../../db/business/business.ts";

export const putBusiness = async (
  req: Request<{ id: string }, {}, BusinessModelType>,
  res: Response<BusinessModelType | { error: unknown }>
) => {
  const id = req.params.id;
  const { name, workerIDs, taskIDs } = req.body;
  try {
    const business = await BusinessModel.findByIdAndUpdate(
      id,
      { name, workerIDs, taskIDs },
      { new: true, runValidators: true }
    );

    if (!business) {
      res.status(404).send({ error: "Business not found" });
      return;
    }
    res.status(200).send(business);
  } catch (error) {
    res.status(500).send(error);
  }
};

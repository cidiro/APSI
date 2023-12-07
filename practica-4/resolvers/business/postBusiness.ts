// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { BusinessModel, BusinessModelType } from "../../db/business/business.ts";

export const postBusiness = async (
  req: Request<{}, {}, BusinessModelType>,
  res: Response<BusinessModelType | { error: unknown }>
) => {
  try {
    const { name, workerIDs, taskIDs } = req.body;
    const business = new BusinessModel({
      name,
      workerIDs,
      taskIDs,
    });
    await business.save();

    res.status(201).send(business);
  } catch (error) {
    res.status(500).send(error);
  }
};

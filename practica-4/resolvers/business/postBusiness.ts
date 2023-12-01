// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Business } from "../../types.ts";
import { BusinessModel, BusinessModelType } from "../../db/business/business.ts";
import { getBusinessFromModel } from "../../controllers/getBusinessFromModel.ts";

export const postBusiness = async (
  req: Request<{}, {}, BusinessModelType>,
  res: Response<Business | { error: unknown }>
) => {
  try {
    const { name, workerIDs, taskIDs } = req.body;
    const business = new BusinessModel({
      name,
      workerIDs,
      taskIDs,
    });
    await business.save();

    const businessResponse: Business = await getBusinessFromModel(business);

    res.status(201).json(businessResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

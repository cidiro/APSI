// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { BusinessModel, BusinessModelType } from "../../db/business/business.ts";

export const getBusinesses = async (
  _req: Request,
  res: Response<BusinessModelType[] | { error: unknown }>
) => {
  try {
    const businesses = await BusinessModel.find({})
      .populate("workerIDs", "_id name")
      .populate("taskIDs", "_id name state")
      .select("-createdAt -updatedAt -__v")
      .exec();

    res.status(200).send(businesses);
  } catch (error) {
    res.status(500).send(error);
  }
};

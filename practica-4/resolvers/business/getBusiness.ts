// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { BusinessModel, BusinessModelType } from "../../db/business/business.ts";

export const getBusiness = async (
  req: Request<{ id: string }>,
  res: Response<BusinessModelType | { error: unknown }>
) => {
  const id = req.params.id;
  try {
    const business = await BusinessModel.findById(id)
      .populate("workerIDs", "_id name")
      .populate("taskIDs", "_id name state")
      .select("-createdAt -updatedAt -__v")
      .exec();

    if (!business) {
      res.status(404).send({ error: "Business not found" });
      return;
    }
    res.status(200).send(business);
  } catch (error) {
    res.status(500).send(error);
  }
};

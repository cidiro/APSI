// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Business } from "../../types.ts";
import { BusinessModel } from "../../db/business/business.ts";
import { getBusinessFromModel } from "../../controllers/getBusinessFromModel.ts";
import { WorkerModel } from "../../db/worker/worker.ts";

export const hireWorker = async (
  req: Request<{ id: string; workerID: string }>,
  res: Response<Business | { error: unknown }>,
) => {
  const id = req.params.id;
  const workerID = req.params.workerID;

  try {
    const worker = await WorkerModel.findById(workerID).exec();
    if (!worker) {
      res.status(404).send({ error: "Worker not found" });
      return;
    }

    const business = await BusinessModel.findByIdAndUpdate(
      id,
      { $push: { workerIDs: workerID } },
      { new: true, runValidators: true },
    );

    if (!business) {
      res.status(404).send({ error: "Business not found" });
      return;
    }
    const businessResponse: Business = await getBusinessFromModel(business);
    res.status(200).json(businessResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

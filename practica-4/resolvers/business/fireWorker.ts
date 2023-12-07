// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { BusinessModel, BusinessModelType } from "../../db/business/business.ts";
import { WorkerModel } from "../../db/worker/worker.ts";

export const fireWorker = async (
  req: Request<{ id: string; workerID: string }>,
  res: Response<BusinessModelType | { error: unknown }>,
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
      { $pull: { workerIDs: workerID } },
      { new: true, runValidators: true },
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

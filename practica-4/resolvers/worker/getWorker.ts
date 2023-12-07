// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { WorkerModel, WorkerModelType } from "../../db/worker/worker.ts";

export const getWorker = async (
  req: Request<{ id: string }>,
  res: Response<WorkerModelType | { error: unknown }>
) => {
  const id = req.params.id;
  try {
    const worker = await WorkerModel.findById(id)
      .populate("businessID", "_id name")
      .populate("taskIDs", "_id name state")
      .select("-createdAt -updatedAt -__v")
      .exec();

    if (!worker) {
      res.status(404).send({ error: "Worker not found" });
      return;
    }

    res.status(200).send(worker);
  } catch (error) {
    res.status(500).send(error);
  }
};

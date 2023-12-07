// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { WorkerModel, WorkerModelType } from "../../db/worker/worker.ts";

export const getWorkers = async (
  _req: Request,
  res: Response<WorkerModelType[] | { error: unknown }>,
) => {
  try {
    const workers = await WorkerModel.find({})
      .populate("businessID", "_id name")
      .populate("taskIDs", "_id name state")
      .select("-createdAt -updatedAt -__v")
      .exec();

    res.status(200).send(workers);
  } catch (error) {
    res.status(500).send(error);
  }
};

// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { TaskModel, TaskModelType } from "../../db/task/task.ts";

export const getTasks = async (
  _req: Request,
  res: Response<TaskModelType[] | { error: unknown }>
) => {
  try {
    const tasks = await TaskModel.find({})
      .populate("workerID", "_id name")
      .populate("businessID", "_id name")
      .select("-createdAt -updatedAt -__v")
      .exec();

    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

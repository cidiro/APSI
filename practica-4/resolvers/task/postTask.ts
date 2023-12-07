// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { TaskModel, TaskModelType } from "../../db/task/task.ts";

export const postTask = async (
  req: Request<{}, {}, TaskModelType>,
  res: Response<TaskModelType | { error: unknown }>
) => {
  try {
    const { name, state, workerID, businessID } = req.body;
    const task = new TaskModel({
      name,
      state,
      workerID,
      businessID,
    });
    await task.save();

    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

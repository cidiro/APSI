// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Task } from "../../types.ts";
import { TaskModel, TaskModelType } from "../../db/task/task.ts";
import { getTaskFromModel } from "../../controllers/getTaskFromModel.ts";

export const postTask = async (
  req: Request<{}, {}, TaskModelType>,
  res: Response<Task | { error: unknown }>
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

    const taskResponse: Task = await getTaskFromModel(task);

    res.status(201).json(taskResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

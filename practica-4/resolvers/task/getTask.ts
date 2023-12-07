// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { TaskModel, TaskModelType } from "../../db/task/task.ts";

export const getTask = async (
  req: Request<{ id: string }>,
  res: Response<TaskModelType | { error: unknown }>
) => {
  const id = req.params.id;
  try {
    const task = await TaskModel.findById(id)
      .populate("workerID", "_id name")
      .populate("businessID", "_id name")
      .select("-createdAt -updatedAt -__v")
      .exec();

    if (!task) {
      res.status(404).send({ error: "Task not found" });
      return;
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

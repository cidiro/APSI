// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { TaskModel, TaskModelType } from "../../db/task/task.ts";

export const putTask = async (
  req: Request<{ id: string }, {}, TaskModelType, { status: string }>,
  res: Response<TaskModelType | { error: unknown }>,
) => {
  const id = req.params.id;
  const { name, workerID, businessID } = req.body;
  const state = req.query.status ? req.query.status : req.body.state;
  console.log(req.query.status);
  console.log(state);

  try {
      const task = await TaskModel.findByIdAndUpdate(
        id,
        { name, state, workerID, businessID },
        { new: true, runValidators: true },
      );

    if (!task) {
      res.status(404).send({ error: "Task not found" });
      return;
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

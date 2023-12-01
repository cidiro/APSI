// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Task } from "../../types.ts";
import { TaskModel } from "../../db/task/task.ts";
import { getTaskFromModel } from "../../controllers/getTaskFromModel.ts";

export const getTasks = async (
  _req: Request,
  res: Response<Task[] | { error: unknown }>
) => {
  try {
    const tasks = await TaskModel.find({}).exec();
    const tasksResponse: Task[] = await Promise.all(
      tasks.map((task) => getTaskFromModel(task))
    );
    res.status(200).json(tasksResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

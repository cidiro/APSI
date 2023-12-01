import { BusinessModelType } from "./business.ts";
import { TaskModel } from "../task/task.ts";

export const businessPostSave = async function (doc: BusinessModelType) {
  if (doc.taskIDs.length) {
    try {
      await TaskModel.updateMany(
        { _id: { $in: doc.taskIDs } },
        { businessID: doc._id },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};

export const businessPostUpdate = async function (doc: BusinessModelType) {
  try {
    const oldTasks = await TaskModel.find({
      businessID: doc._id,
    });
    const oldTaskIDs = oldTasks.map((task) => task._id);

    const taskIDsRemoved = oldTaskIDs.filter(
      (taskID) => !doc.taskIDs.includes(taskID),
    );
    const taskIDsAdded = doc.taskIDs.filter(
      (taskID) => !oldTaskIDs.includes(taskID),
    );

    await TaskModel.updateMany(
      { _id: { $in: taskIDsRemoved } },
      { businessID: null },
    );
    await TaskModel.updateMany(
      { _id: { $in: taskIDsAdded } },
      { businessID: doc._id },
    );
  } catch (_e) {
    console.log(_e);
  }
}

export const businessPostDelete = async function (doc: BusinessModelType) {
  if (doc.taskIDs.length) {
    try {
      await TaskModel.updateMany(
        { _id: { $in: doc.taskIDs } },
        { businessID: null },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};

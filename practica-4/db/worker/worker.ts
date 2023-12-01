import mongoose from "mongoose";
import { Worker } from "../../types.ts";
import { validators } from "./validators.ts";
import { globalValidators } from "../globalValidators.ts";
import { workerPostDelete, workerPostSave, workerPostUpdate } from "./middleware.ts";

export type WorkerModelType =
  & mongoose.Document
  & Omit<Worker, "id" | "business" | "tasks">
  & {
    businessID: mongoose.Types.ObjectId | null;
    taskIDs: Array<mongoose.Types.ObjectId>;
  };

const Schema = mongoose.Schema;

const workerSchema = new Schema(
  {
    name: { type: String, required: true },
    businessID: { type: Schema.Types.ObjectId, required: false, ref: "Business" },
    taskIDs: [
      { type: Schema.Types.ObjectId, required: false, ref: "Task" },
    ],
  },
  { timestamps: true },
);

workerSchema.path("name").validate(
  globalValidators.nameIsValid,
  "Name must be between 3 and 50 characters",
);

workerSchema.path("businessID").validate(
  globalValidators.idIsValid,
  "Invalid business ID",
);

workerSchema.path("businessID").validate(
  validators.businessExists,
  "Business doesn't exist in the database",
);

workerSchema.path("taskIDs").validate(
  globalValidators.idsAreValid,
  "Invalid task IDs",
);

workerSchema.path("taskIDs").validate(
  validators.tasksExist,
  "Some tasks don't exist in the database",
);

workerSchema.path("taskIDs").validate(
  validators.tasksHaveNoWorker,
  "Some tasks already have a worker assigned",
);

// on save: update related documents
workerSchema.post("save", workerPostSave);

// on update: update related documents
workerSchema.post("findOneAndUpdate", workerPostUpdate);

// on delete: update related documents
workerSchema.post("deleteOne", workerPostDelete);

export const WorkerModel = mongoose.model<WorkerModelType>(
  "Worker",
  workerSchema,
);

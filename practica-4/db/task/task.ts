import mongoose from "mongoose";
import { Task, State } from "../../types.ts";
import { validators } from "./validators.ts";
import { globalValidators } from "../globalValidators.ts";
import { taskPostDelete, taskPostSave, taskPostUpdate } from "./middleware.ts";

export type TaskModelType =
  & mongoose.Document
  & Omit<Task, "id" | "worker" | "business">
  & {
    workerID: mongoose.Types.ObjectId | null;
    businessID: mongoose.Types.ObjectId | null;
  };

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    name: { type: String, required: true },
    state: { type: State, required: false, enum: State, default: State.TODO },
    workerID: { type: Schema.Types.ObjectId, required: false, ref: "Worker" },
    businessID: { type: Schema.Types.ObjectId, required: false, ref: "Business" },
  },
  { timestamps: true },
);

taskSchema.path("name").validate(
  globalValidators.nameIsValid,
  "Name must be between 3 and 50 characters",
);

taskSchema.path("state").validate(
  globalValidators.stateIsValid,
  "Invalid state",
);

taskSchema.path("workerID").validate(
  globalValidators.idIsValid,
  "Invalid worker ID",
);

taskSchema.path("workerID").validate(
  validators.workerExists,
  "Worker doesn't exist in the database",
);

taskSchema.path("businessID").validate(
  globalValidators.idIsValid,
  "Invalid business ID",
);

taskSchema.path("businessID").validate(
  validators.businessExists,
  "Business doesn't exist in the database",
);

// on save: update related documents
taskSchema.post("save", taskPostSave);

// on update: update related documents
taskSchema.post("findOneAndUpdate", taskPostUpdate);

// on delete: update related documents
taskSchema.post("deleteOne", taskPostDelete);

export const TaskModel = mongoose.model<TaskModelType>(
  "Task",
  taskSchema,
);

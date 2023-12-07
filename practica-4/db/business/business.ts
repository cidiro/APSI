import mongoose from "mongoose";
import { Business } from "../../types.ts";
import { validators } from "./validators.ts";
import { globalValidators } from "../globalValidators.ts";
import { businessPostDelete, businessPostSave, businessPostUpdate } from "./middleware.ts";

export type BusinessModelType =
  & mongoose.Document
  & Omit<Business, "id" | "workers" | "tasks">
  & {
    workerIDs: Array<mongoose.Types.ObjectId>;
    taskIDs: Array<mongoose.Types.ObjectId>;
  };

const Schema = mongoose.Schema;

const businessSchema = new Schema(
  {
    name: { type: String, required: true },
    workerIDs: [
      { type: Schema.Types.ObjectId, required: false, ref: "Worker" },
    ],
    taskIDs: [
      { type: Schema.Types.ObjectId, required: false, ref: "Task" },
    ],
  },
  { timestamps: true },
);

businessSchema.path("name").validate(
  globalValidators.nameIsValid,
  "Name must be between 3 and 50 characters",
);

businessSchema.path("workerIDs").validate(
  validators.workersAreNoMoreThanTen,
  "A business can't have more than 10 workers",
);

businessSchema.path("workerIDs").validate(
  globalValidators.idsAreValid,
  "Invalid worker IDs",
);

businessSchema.path("workerIDs").validate(
  validators.workersExist,
  "Some workers don't exist in the database",
);

businessSchema.path("workerIDs").validate(
  validators.workersHaveNoBusiness,
  "Some workers already have a business assigned",
);

businessSchema.path("taskIDs").validate(
  globalValidators.idsAreValid,
  "Invalid task IDs",
);

businessSchema.path("taskIDs").validate(
  validators.tasksExist,
  "Some tasks don't exist in the database",
);

businessSchema.path("taskIDs").validate(
  validators.tasksHaveNoBusiness,
  "Some tasks already have a business assigned",
);

// on save: update related documents
businessSchema.post("save", businessPostSave);

// on update: update related documents
businessSchema.post("findOneAndUpdate", businessPostUpdate);

// on delete: update related documents
businessSchema.post("findOneAndDelete", businessPostDelete);

export const BusinessModel = mongoose.model<BusinessModelType>(
  "Business",
  businessSchema,
);

// @deno-types="npm:@types/express@4"
import express from "express";
import mongoose from "mongoose";

import { postWorker } from "./resolvers/worker/postWorker.ts";
import { putWorker } from "./resolvers/worker/putWorker.ts";
import { deleteWorker } from "./resolvers/worker/deleteWorker.ts";
import { getWorkers } from "./resolvers/worker/getWorkers.ts";
import { getWorker } from "./resolvers/worker/getWorker.ts";

import { postBusiness } from "./resolvers/business/postBusiness.ts";
import { putBusiness } from "./resolvers/business/putBusiness.ts";
import { deleteBusiness } from "./resolvers/business/deleteBusiness.ts";
import { getBusinesses } from "./resolvers/business/getBusinesses.ts";
import { getBusiness } from "./resolvers/business/getBusiness.ts";
import { fireWorker } from "./resolvers/business/fireWorker.ts";
import { hireWorker } from "./resolvers/business/hireWorker.ts";

import { postTask } from "./resolvers/task/postTask.ts";
import { putTask } from "./resolvers/task/putTask.ts";
import { deleteTask } from "./resolvers/task/deleteTask.ts";
import { getTasks } from "./resolvers/task/getTasks.ts";
import { getTask } from "./resolvers/task/getTask.ts";


const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
  .get("/worker", getWorkers)
  .get("/worker/:id", getWorker)
  .post("/worker", postWorker)
  .put("/worker/:id", putWorker)
  .delete("/worker/:id", deleteWorker)
  .get("/business", getBusinesses)
  .get("/business/:id", getBusiness)
  .post("/business", postBusiness)
  .put("/business/:id", putBusiness)
  .delete("/business/:id", deleteBusiness)
  .put("/business/:id/fire/:workerID", fireWorker)
  .put("/business/:id/hire/:workerID", hireWorker)
  .get("/task", getTasks)
  .get("/task/:id", getTask)
  .post("/task", postTask)
  .put("/task/:id", putTask)
  .delete("/task/:id", deleteTask);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

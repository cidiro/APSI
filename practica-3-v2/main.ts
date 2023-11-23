// @deno-types="npm:@types/express@4"
import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { postClient } from "./resolvers/postClient.ts";
import { putClient } from "./resolvers/putClient.ts";
import { deleteClient } from "./resolvers/deleteClient.ts";
import { getClients } from "./resolvers/getClients.ts";
import { getClient } from "./resolvers/getClient.ts";

import { postManager } from "./resolvers/postManager.ts";
import { putManager } from "./resolvers/putManager.ts";
import { deleteManager } from "./resolvers/deleteManager.ts";
import { getManagers } from "./resolvers/getManagers.ts";
import { getManager } from "./resolvers/getManager.ts";

import { postMortgage } from "./resolvers/postMortgage.ts";
import { putMortgage } from "./resolvers/putMortgage.ts";
import { deleteMortgage } from "./resolvers/deleteMortgage.ts";
import { getMortgages } from "./resolvers/getMortgages.ts";
import { getMortgage } from "./resolvers/getMortgage.ts";


const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
  .get("/managers", getManagers)
  .get("/clients", getClients)
  .get("/mortgages", getMortgages)
  .get("/manager/:id", getManager)
  .get("/client/:id", getClient)
  .get("/mortgage/:id", getMortgage)
  .post("/manager", postManager)
  .post("/client", postClient)
  .post("/mortgage", postMortgage)
  .put("/manager/:id", putManager)
  .put("/client/:id", putClient)
  .put("/mortgage/:id", putMortgage)
  .delete("/manager/:id", deleteManager)
  .delete("/client/:id", deleteClient)
  .delete("/mortgage/:id", deleteMortgage);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

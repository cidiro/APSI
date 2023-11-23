import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getClients from "./resolvers/getClients.ts";
import getClient from "./resolvers/getClient.ts";
import addClient from "./resolvers/addClient.ts";
import updateClient from "./resolvers/updateClient.ts";
import deleteClient from "./resolvers/deleteClient.ts";

import getManagers from "./resolvers/getManagers.ts";
import getManager from "./resolvers/getManager.ts";
import addManager from "./resolvers/addManager.ts";
import updateManager from "./resolvers/updateManager.ts";
import deleteManager from "./resolvers/deleteManager.ts";

import getMortgages from "./resolvers/getMortgages.ts";
import getMortgage from "./resolvers/getMortgage.ts";
import addMortgage from "./resolvers/addMortgage.ts";
import deleteMortgage from "./resolvers/deleteMortgage.ts";

import assignClient from "./resolvers/assignClient.ts";
import depositFunds from "./resolvers/depositFunds.ts";
import transferFunds from "./resolvers/transferFunds.ts";
import redeemMortgage from "./resolvers/redeemMortgage.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
const PORT = env.PORT || Deno.env.get("PORT") || 3000;

if (MONGO_URL) {

  await mongoose.connect(MONGO_URL);
  const app = express();
  app.use(express.json());
  app
	.get("/api/clients", getClients)
	.get("/api/clients/:id", getClient)
	.post("/api/clients", addClient)
	.put("/api/clients/:id", updateClient)
	.delete("/api/clients/:id", deleteClient)
	.get("/api/managers", getManagers)
	.get("/api/managers/:id", getManager)
	.post("/api/managers", addManager)
	.put("/api/managers/:id", updateManager)
	.delete("/api/managers/:id", deleteManager)
	.get("/api/mortgages", getMortgages)
	.get("/api/mortgages/:id", getMortgage)
	.post("/api/mortgages", addMortgage)
	.delete("/api/mortgages/:id", deleteMortgage)
	.put("/api/assignClient/:client_id", assignClient)
	.put("/api/depositFunds/:client_id", depositFunds)
	.put("/api/transferFunds/:client_id_A", transferFunds)
	.put("/api/redeemMortgage/:id", redeemMortgage);

  app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
  });
} else {
	console.log("No mongo URL found");
}
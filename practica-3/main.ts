import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getMonuments from "./resolvers/getMonuments.ts";
import getMonument from "./resolvers/getMonument.ts";
import addMonument from "./resolvers/addMonument.ts";
import updateMonument from "./resolvers/updateMonument.ts";
import deleteMonument from "./resolvers/deleteMonument.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
const PORT = env.PORT || Deno.env.get("PORT") || 3000;

if (!MONGO_URL) {
	console.log("No mongo URL found");
	Deno.exit(1);
  }

  await mongoose.connect(MONGO_URL);
  const app = express();
  app.use(express.json());
  app
	.get("/api/monumentos", getMonuments)
	.get("/api/monumentos/:id", getMonument)
	.post("/api/monumentos", addMonument)
	.put("/api/monumentos/:id", updateMonument)
	.delete("/api/monumentos/:id", deleteMonument);

  app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
  });
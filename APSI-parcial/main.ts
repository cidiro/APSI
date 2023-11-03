import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getCharacters from "./resolvers/getCharacters.ts";
import getCharacter from "./resolvers/getCharacter.ts";
import addCharacter from "./resolvers/addCharacter.ts";
import addRace from "./resolvers/addRace.ts";
import updateCharacter from "./resolvers/updateCharacter.ts";
import deleteCharacter from "./resolvers/deleteCharacter.ts";

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
	.get("/api/tierramedia/personajes", getCharacters)
	.get("/api/tierramedia/personajes/:id", getCharacter)
	.post("/api/tierramedia/personajes", addCharacter)
	.post("/api/tierramedia/razas", addRace)
	.put("/api/tierramedia/personajes/:id", updateCharacter)
	.delete("/api/tierramedia/personajes/:id", deleteCharacter);

  app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
  });
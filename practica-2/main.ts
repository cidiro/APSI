import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getProducts from "./resolvers/getProducts.ts";
import getClients from "./resolvers/getClients.ts";
import getInvoice from "./resolvers/getInvoice.ts";
import addProduct from "./resolvers/addProduct.ts";
import addClient from "./resolvers/addClient.ts";
import addInvoice from "./resolvers/addInvoice.ts";
import deleteProduct from "./resolvers/deleteProduct.ts";
import deleteClient from "./resolvers/deleteClient.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
	console.log("No mongo URL found");
	Deno.exit(1);
  }

  await mongoose.connect(MONGO_URL);
  const app = express();
  app.use(express.json());
  app
	.get("/products", getProducts)
	.get("/client", getClients)
	.get("/invoice/:id", getInvoice)
	.post("/products", addProduct)
	.post("/client", addClient)
	.post("/invoice", addInvoice)
	.delete("/products/:id", deleteProduct)
	.delete("/client/:cif", deleteClient);

  app.listen(3000, () => {
	console.log("Server listening on port 3000");
  });
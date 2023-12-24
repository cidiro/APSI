import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

import typeDefs from "./typeDefs.ts";
import resolvers from "./resolvers/index.ts";


//const MONGO_URL = Deno.env.get("MONGO_URL");
const MONGO_URL="mongodb+srv://ropalop:ñplokmijn@cluster0.jraxv22.mongodb.net/APSI-?retryWrites=true&w=majority"

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

import queryResolvers from "./resolvers/queries/index.ts";
import mutationResolvers from "./resolvers/mutations/index.ts";
import typeDefs from "./typeDefs.ts";


const MONGO_URL = "mongodb+srv://ropalop:ñplokmijn@cluster0.jraxv22.mongodb.net/APSI-practica-4?retryWrites=true&w=majority"
// Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    ...queryResolvers,
    ...mutationResolvers,
  },
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);

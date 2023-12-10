import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

import typeDefs from "./typeDefs.ts";
import queryResolvers from "./resolvers/queries/index.ts";
import mutationResolvers from "./resolvers/mutations/index.ts";
import entityResolvers from "./resolvers/entities/index.ts";


const MONGO_URL = Deno.env.get("MONGO_URL");

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
    ...entityResolvers,
  },
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import { getPetFromModel } from "./controllers/getPetFromModel.ts";
import { PetModel } from "./db/pet.ts";
import { Pet } from "./types.ts";


const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

// The GraphQL schema
const typeDefs = `#graphql
  type Pet {
    id: ID!
    name: String!
    breed: String!
  }
  type Query {
    hello: String!
    pets: [Pet!]!
    pet(id: ID!): Pet!
  }
  type Mutation {
    addPet(name: String!, breed: String!): Pet!
    deletePet(id: ID!): Pet!
    updatePet(id: ID!, name: String!, breed: String!): Pet!
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",


    pets: async (): Promise<Pet[]> => {
        const pets = await PetModel.find({}).exec();
        return pets.map(getPetFromModel);
    },


    pet: async (_: unknown, args: { id: string }): Promise<Pet> => {
      const pet = await PetModel.findById(args.id).exec();
      if (!pet) {
        throw new GraphQLError(`No pet found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return getPetFromModel(pet);
    },
  },


  Mutation: {
    addPet: async (
      _: unknown,
      args: { id: string; name: string; breed: string }
    ): Promise<Pet> => {

      const petExists = await PetModel.findById(args.id).exec();
      if (petExists) {
        throw new GraphQLError(`Pet with id ${args.id} already exists`, {
          extensions: { code: "ALREADY_EXISTS" },
        });
      }

      const pet = new PetModel({
        name : args.name,
        breed: args.breed,
      });

      await pet.save();
      return getPetFromModel(pet);
    },


    deletePet: async (_: unknown, args: { id: string }): Promise<Pet> => {
      const pet = await PetModel.findByIdAndDelete(args.id).exec();
      if (!pet) {
        throw new GraphQLError(`No pet found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return getPetFromModel(pet);
    },


    updatePet: async (
      _: unknown,
      args: { id: string; name: string; breed: string }
    ): Promise<Pet> => {
      const pet = await PetModel.findByIdAndUpdate(
        args.id,
        { name: args.name, breed: args.breed },
        { new: true }
      ).exec();

      if (!pet) {
        throw new GraphQLError(`No pet found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return getPetFromModel(pet);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);

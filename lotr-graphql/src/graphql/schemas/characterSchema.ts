// My imports look like this: import mongoose from "npm:mongoose@7.6.3";
// import gql
import { gql } from "apollo-server-express";


export const characterTypeDefs = gql`
  type Character {
    id: ID!
    name: String!
    race: Race!
    description: String!
    abilities: [Ability!]!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    characters: [Character!]!
    character(id: ID!): Character
  }

  extend type Mutation {
    addCharacter(name: String!, race: ID!, description: String!, abilities: [ID!]!): Character
    updateCharacter(id: ID!, name: String, race: ID, description: String, abilities: [ID]): Character
    deleteCharacter(id: ID!): Character
  }
`;

// The resolvers for these operations will be defined in /graphql/resolvers/characterResolvers.ts

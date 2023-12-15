const typeDefs = `#graphql
  type Character {
    id: ID!
    name: String!
    episode: [Episode!]!
  }

  type Episode {
    id: ID!
    name: String!
    characters: [Character!]!
  }

  type Query {
    getCharacter(id: ID!): Character!
    getCharacterByIds(ids: [ID!]!): [Character!]!
  }
`;

export default typeDefs;

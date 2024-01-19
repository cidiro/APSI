const typeDefs = `#graphql
  type Contact {
    id: ID!
    fullName: String!
    number: String!
    country: String
    time: String
  }

  type Query {
    getContact(id: ID!): Contact!
    getContacts: [Contact!]!
  }

  type Mutation {
    addContact(fullName: String!, number: String!): Contact!
    updateContact(id: ID!, fullName: String, number: String): Contact!
    deleteContact(id: ID!): Boolean!
  }
`;

export default typeDefs;

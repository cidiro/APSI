const typeDefs = `#graphql
  type Client {
    id: ID!
    name: String!
    email: String!
    cards: [String!]
    travels: [Travel!]
  }

  type Driver {
    id: ID!
    name: String!
    email: String!
    username: String!
    travels: [Travel!]
  }

  type Travel {
    id: ID!
    money: Double!
    distance: Double!
    date: String!
    status: String
    client: Client
    driver: Driver
  }

  type Query {
    getClient(id: ID!): Client!
    getClients: [Client!]!

    getDriver(id: ID!): Driver!
    getDrivers: [Driver!]!

    getTravel(id: ID!): Travel!
    getTravels: [Travel!]!
  }

  type Mutation {
    addClient(name: String!, email: String!, cards: [String!], travels: [ID!]): Client!
    updateClient(id: ID!, name: String, email: String, cards: [String!], travels: [ID!]): Client!
    deleteClient(id: ID!): Client!

    addDriver(name: String!, email: String!, username: String!, travels: [ID!]): Driver!
    updateDriver(id: ID!, name: String, email: String, username: String, travels: [ID!]): Driver!
    deleteDriver(id: ID!): Driver!

    addTravel(money: Double!, distance: Double!, date: String!, status: String, client: ID, driver: ID): Travel!
    updateTravel(id: ID!, money: Double, distance: Double, date: String, status: String, client: ID, driver: ID): Travel!
    deleteTravel(id: ID!): Travel!
  }
`;

export default typeDefs;

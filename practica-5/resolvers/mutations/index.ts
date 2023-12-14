import addClient from "./client/addClient.ts";
import updateClient from "./client/updateClient.ts";
import deleteClient from "./client/deleteClient.ts";
import addDriver from "./driver/addDriver.ts";
import updateDriver from "./driver/updateDriver.ts";
import deleteDriver from "./driver/deleteDriver.ts";
import addTravel from "./travel/addTravel.ts";
import updateTravel from "./travel/updateTravel.ts";
import deleteTravel from "./travel/deleteTravel.ts";

const mutations = {
  Mutation: {
    ...addClient.Mutation,
    ...updateClient.Mutation,
    ...deleteClient.Mutation,
    ...addDriver.Mutation,
    ...updateDriver.Mutation,
    ...deleteDriver.Mutation,
    ...addTravel.Mutation,
    ...updateTravel.Mutation,
    ...deleteTravel.Mutation,
  },
};

export default mutations;

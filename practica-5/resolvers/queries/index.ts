import getClient from "./client/getClient.ts";
import getClients from "./client/getClients.ts";
import getDriver from "./driver/getDriver.ts";
import getDrivers from "./driver/getDrivers.ts";
import getTravel from "./travel/getTravel.ts";
import getTravels from "./travel/getTravels.ts";

const queries = {
  Query: {
    ...getClient.Query,
    ...getClients.Query,
    ...getDriver.Query,
    ...getDrivers.Query,
    ...getTravel.Query,
    ...getTravels.Query,
  },
};

export default queries;

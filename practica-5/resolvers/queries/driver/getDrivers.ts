import { DriverModel, DriverModelType } from "../../../db/driver/driver.ts";

const getDrivers = {
  Query: {
    getDrivers: async (): Promise<DriverModelType[]> => {
      const drivers = await DriverModel.find({}).exec();
      return drivers;
    },
  },
};

export default getDrivers;

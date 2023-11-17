// @ts-ignore: Deno bug
import { Request, Response } from "npm:express@4.18.2";
import ManagerModel from "../db/manager.ts";


const deleteManager = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const manager = await ManagerModel.findOneAndDelete({ id }).exec();
    if (!manager) {
      res.status(404).send("Manager not found.");
      return;
    }
    res.status(200).send("Manager deleted.");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteManager;

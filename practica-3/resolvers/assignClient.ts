// @ts-ignore: Deno bug
import { Request, Response } from "npm:express@4.18.2";
import updateClient from "./updateClient.ts";
import updateManager from "./updateManager.ts";
import ClientModel from "../db/client.ts";
import ManagerModel from "../db/manager.ts";


const assignClient = async (req: Request, res: Response) => {
	try {
		const { client_id } = req.params;
		const { manager_id } = req.body;

		if (!manager_id) {
			res.status(400).send("Manager id must be provided.");
			return;
		}

		const clientExists = await ClientModel.findOne({ id: client_id }).exec();
		if (!clientExists) {
			res.status(400).send("Client with that id does not exist.");
			return;
		}

		const manager = await ManagerModel.findOne({ id: manager_id }).exec();
		if (!manager) {
			res.status(400).send("Manager with that id does not exist.");
			return;
		}

		await updateClient(
			{ params: { id: client_id }, body: { manager_id } } as unknown as Request,
			res
		);

		const clients = manager.clients;
		clients.push(client_id);

		await updateManager(
			{ params: { id: manager_id }, body: { clients } } as unknown as Request,
			res
		);

	} catch (error) {
		res.status(500).send(error.message);
		return;
  	}
};

export default assignClient;

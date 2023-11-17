// @ts-ignore: Deno bug
import {Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/client.ts";


const transferFunds = async (req: Request, res: Response) => {
	try {
		const { client_id_A } = req.params;
		const { client_id_B, amount } = req.body;

		if (!client_id_B || !amount) {
			res.status(400).send("ID of destinatary and amount must be provided.");
			return;
		}

		if (isNaN(parseInt(amount))) {
			res.status(500).send("Amount must be a valid number.");
			return;
		}

		if (amount <= 0) {
			res.status(400).send("Amount must be greater than 0.");
			return;
		}

		const client_A = await ClientModel.findOne({ id: client_id_A }).exec();
		if (!client_A) {
			res.status(400).send("Client A does not exist with the given ID.");
			return;
		}

		const client_B = await ClientModel.findOne({ id: client_id_B }).exec();
		if (!client_B) {
			res.status(400).send("Client B does not exist with the given ID.");
			return;
		}

		if (client_A.balance < amount) {
			res.status(400).send("Client A does not have enough balance.");
			return;
		}

		client_A.balance -= amount;
		client_B.balance += amount;

		await client_A.save();
		await client_B.save();

		res.status(200).send("Transfer successful (" + amount + ")\n" +
					"Client A (" + client_id_A + "): " + client_A.balance + "\n" +
					"Client B (" + client_id_B + "): " + client_B.balance);

		console.log("Transfer successful (" + amount + ")\n",
					"Client A (" + client_id_A + "): " + client_A.balance + "\n",
					"Client B (" + client_id_B + "): " + client_B.balance);

	} catch (error) {
	  res.status(500).send(error.message);
	  return;
	}
};

export default transferFunds;

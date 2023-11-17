// @ts-ignore: Deno bug
import {Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/client.ts";


const depositFunds = async (req: Request, res: Response) => {
	try {
		const { client_id } = req.params;
		const { amount } = req.body;

		if (!amount) {
			res.status(400).send("Deposit amount must be provided.");
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

		const client = await ClientModel.findOne({ id: client_id }).exec();
		if (!client) {
			res.status(400).send("Client does not exist with the given ID.");
			return;
		}

		client.balance += amount;

		await client.save();

		res.status(200).send("Deposit successful (" + amount + ")\n");

		console.log("Deposit successful (" + amount + ")\n");

	} catch (error) {
	  res.status(500).send(error.message);
	  return;
	}
};

export default depositFunds;

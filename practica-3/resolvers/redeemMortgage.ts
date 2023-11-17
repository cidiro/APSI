// @ts-ignore: Deno bug
import { Request, Response } from "npm:express@4.18.2";
import MortgageModel from "../db/mortgage.ts";
import ClientModel from "../db/client.ts";


const redeemMortgage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

	const mortgage = await MortgageModel.findOne({ _id: id }).exec();
	if (!mortgage) {
		res.status(404).send("Mortgage not found.");
		return;
	}

	if (mortgage.terms_remaining == 0) {
		res.status(400).send("Mortgage already fully redeemed.");
		return;
	}

	const installment = mortgage.amount / mortgage.terms;

	const client = await ClientModel.findOne({ id: mortgage.client_id }).exec();
	if (!client) {
		res.status(404).send("Client not found.");
		return;
	}

	if (client.balance < installment) {
		res.status(400).send("Client does not have enough balance to redeem " +
							 "installment " + (mortgage.terms - mortgage.terms_remaining) + ".\n" +
							 "Balance: " + client.balance + ", Installment: " + installment);
		return;
	}

	client.balance -= installment;
	mortgage.terms_remaining -= 1;

	await client.save();
	await mortgage.save();

	res.status(200).send("Mortgage installment redeemed.\n" +
						 "Installment: " + installment + "\n" +
						 "Balance: " + client.balance + "\n" +
						 "Terms remaining: " + mortgage.terms_remaining);

	console.log("Mortgage installment redeemed.\n",
				"Installment: " + installment + "\n",
				"Balance: " + client.balance + "\n",
				"Terms remaining: " + mortgage.terms_remaining);

  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default redeemMortgage;

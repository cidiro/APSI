import { Request, Response } from "npm:express@4.18.2";
import InvoiceModel from "../db/invoice.ts";
import ClientModel from "../db/client.ts";


const addInvoice = async (req: Request, res: Response) => {
  try {
    const { client, products, total } = req.body;

    if (!client || !products || !total) {
      res.status(400).send("Client ID, product list and total cost are required");
      return;
    }

    if (!await ClientModel.findOne({ cif: client }).exec()) {
      res.status(400).send("Client does not exist");
      return;
    }

    const newInvoice = new InvoiceModel({ client, products, total });
    await newInvoice.save();

    res.status(200).send({
      client: newInvoice.client,
      products: newInvoice.products,
      total: newInvoice.total,
      id: newInvoice._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addInvoice;

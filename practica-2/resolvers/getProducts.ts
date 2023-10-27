import { Request, Response } from "npm:express@4.18.2";
import ProductModel from "../db/product.ts";


const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find().exec();
    if (!products) {
      res.status(404).send("There are no products");
      return;
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getProducts;

import { Request, Response } from "npm:express@4.18.2";
import ProductModel from "../db/product.ts";


const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, stock, description, price } = req.body;
    if (!name || !price) {
      res.status(400).send("Name and Price are required");
      return;
    }

    const alreadyExists = await ProductModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("Product already exists");
      return;
    }

    const newProduct = new ProductModel({ name, stock, description, price });
    await newProduct.save();

    res.status(200).send({
      name: newProduct.name,
      stock: newProduct.stock ? newProduct.stock : 0,
      description: newProduct.description,
      price: newProduct.price,
      id: newProduct._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addProduct;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";
import { ProductItem } from "../../types/Product";

type Data = {
  name: string;
};

export const initMongoose = async () => {
  if (mongoose.connection.readyState === 1)
    return mongoose.connection.asPromise();
  return await mongoose.connect(
    `mongodb+srv://amber:${process.env.MONGO_PASSWORD}@amber-ecommerce-creatio.bpzv3gz.mongodb.net/amber-ecommerce-products?retryWrites=true&w=majority`
  );
};

export const findAllProducts = async () => {
  return (await Product.find().exec()) as ProductItem[];
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ProductItem[]>
) => {
  try {
    await initMongoose();
    res.json(await findAllProducts());
  } catch (err) {
    console.log("Unable to connect to MongoDB: " + err);
  }
};

export default handler;

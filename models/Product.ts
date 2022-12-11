import { model, models, Schema } from "mongoose";

const ProductSchema: Schema = new Schema({
  name: String,
  description: String,
  type: String,
  price: Number,
  imageLocation: String,
});

const Product = models?.Product || model("Product", ProductSchema);

export default Product;

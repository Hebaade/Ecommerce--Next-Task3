import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    category: String,
    brand: String,
    stock: Number,
    rating: Number,
    thumbnail: String,
    images: [String],
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
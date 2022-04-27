import mongoose from "mongoose";
const { Schema, model } = mongoose;
const productSchema = new Schema({
  name: { type: String },
  category: { type: String },
  price: { type: Number },
});
export default model("product", productSchema);

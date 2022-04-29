import mongoose from "mongoose";
const { Schema, model } = mongoose;
const authorSchema = new Schema({
  name: { type: String },
  avatar: { type: String },
});
export default model("Author", authorSchema);

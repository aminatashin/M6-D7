import { text } from "express";
import mongoose from "mongoose";
const { Schema, model } = mongoose;
const commentSchema = new Schema({
  text: { type: String },
});
export default model("comment", commentSchema);

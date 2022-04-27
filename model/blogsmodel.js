import { text } from "express";
import mongoose from "mongoose";

// =======================================
const { Schema, model } = mongoose;
const blogSchema = new Schema(
  {
    category: { type: String },
    title: { type: String },
    cover: { type: String },
    readTime: {
      value: { type: Number },
      unit: { type: Number },
    },
    author: {
      name: { type: String },
      avatar: { type: String },
    },
    content: { type: String },
    customerComment: [{ text: String, commentDate: Date }],
  },
  { timestamps: true }
);
export default model("blog", blogSchema);

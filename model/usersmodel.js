import mongoose from "mongoose";
// ================================
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    age: { type: Number, min: 18, max: 65 },
    email: { type: String },
  },
  { Timestamps: true }
);
export default model("user", userSchema);

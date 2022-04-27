import express from "express";
import productsmodel from "../../../model/productsmodel.js";

const productRouter = express.Router();
// ==========================================
productRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = await productsmodel(req.body);
    const { _id } = await newProduct.save();
    res.send(newProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// ===========================================
productRouter.get("/", async (req, res, next) => {
  try {
    const product = await productsmodel.find();
    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// ===========================================
export default productRouter;

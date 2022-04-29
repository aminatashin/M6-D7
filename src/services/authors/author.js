import express from "express";
import authorsmodel from "../../../model/authorsmodel.js";
const authorRouter = express.Router();
authorRouter.post("/", async (req, res, next) => {
  try {
    const author = await authorsmodel(req.body);
    const { _id } = await author.save();
    res.send({ _id });
  } catch (error) {}
});

export default authorRouter;
